import { Context } from '../context'
import { CreateChannelInput, UserInput, UserRegisterInput, Message, FriendRequestStatus, User } from '../types/resolvers-types'

export const resolvers = {
  Query: {
    getUser: (_parent, args: { clerkId: string }, context: Context) => {
      return context.prisma.user.findUnique({
        where: { clerkId: args.clerkId || undefined },
      })
    },
    getChannel: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.channel.findUnique({
        where: { id: args.id || undefined },
      })
    },
    getAllUserChannels: (_parent, args: { userInput: UserInput }, context: Context) => {
      return context.prisma.user
        .findUnique({
          where: { id: args.userInput.id || undefined, email: args.userInput.email },
        }).channels()
     
    },
    friendRequestsSentByUser: (_parent, args: {clerkId: string}, context: Context) =>{
      return context.prisma.friendRequest.findMany({
        where: {sender: {clerkId: args.clerkId}, status: 'PENDING'}
      })
    },
    friendRequestsReceivedByUser: (_parent, args: {clerkId: string}, context: Context) => {
      return context.prisma.friendRequest.findMany({
        where: {receiver: {clerkId: args.clerkId}, status: 'PENDING'}
      })
    }
  },
  Mutation: {
    createUser: async (_parent, args: { input: UserRegisterInput }, context: Context) => {

      try{
         const user = await context.prisma.user.create({
          data: {
           username: args.input.username,
            email: args.input.email,
            avatar: args.input.avatar,
            clerkId: args.input.clerkId,
          },
        })
     
      return  user
      } catch(error){
        console.error(error.message)
      }
    },
    sendFriendRequest: async (_parent, args: {clerkId: string, contactUserEmail: string}, context: Context ) => {
      const {clerkId, contactUserEmail} = args 

      const requestSender = await context.prisma.user.findUnique({where: {clerkId: clerkId}})

      if(!requestSender){
        throw new Error('Current User Not Found')
      }

      const requestReceiver = await context.prisma.user.findUnique({where: {email: contactUserEmail}})
      if(!requestReceiver){
        throw new Error('Contact Not Found')
      }

      if(requestSender.clerkId === requestReceiver.clerkId){
        throw new Error('Cannot Add Yourself As A Contact')
      }

      const existingContact = await context.prisma.contact.findFirst({where:{
        userClerkId: requestSender.clerkId,
        contactClerkId: requestReceiver.clerkId,
      }})

      if(existingContact){
        throw new Error('Contact Already Exists')
      }

      const existingFriendRequest = await context.prisma.friendRequest.findFirst({
        where: {
          senderClerkId: requestSender.clerkId,
          receiverClerkId: requestReceiver.clerkId,
          status: 'PENDING',
        },
      })

    if (existingFriendRequest) {
      throw new Error('Friend request already sent')
    }
      
      
      const friendRequest = await context.prisma.friendRequest.create({
        data: {
            sender: { connect: { clerkId: requestSender.clerkId} },
            receiver: { connect: { clerkId: requestReceiver.clerkId} },
            status: 'PENDING',
          },
          include: {
          receiver: true,
          },
        })

        return friendRequest
    },
    respondToFriendRequest: async(_parent, args: {requestId: number, status: FriendRequestStatus}, context: Context) => {
          
      const request = await context.prisma.friendRequest.findUnique({ where: { id: args.requestId } })
          if (!request) {
             throw new Error('friend request not found')
          }

        if(args.status === 'ACCEPTED'){
          await context.prisma.contact.create({
            data:{
              user:{connect:{clerkId: request.senderClerkId}},
              contactUser: {connect:{clerkId: request.receiverClerkId}},
            }
          })
        }

       const updatedRequest = context.prisma.friendRequest.update({
                                where: { id: args.requestId },
                                data: { status: args.status },
                              })

      return updatedRequest

    }
    ,
    createChannel: async (_parent, args: { input: CreateChannelInput }, context: Context) => {

      const { name, userIds } = args.input

      const users = await context.prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
      })
      
      if (users.some((user) => !user)) {
        throw new Error('One or more users not found')
      }

      const channel = await context.prisma.channel.create({
        data: {
          name: name,
          members: {
            connect: users.map((user) => ({ id: user.id })),
          },
          isGroupChat: true,
        },
        include: {
            members: true, // Include the members relation in the response
        },
      })  

      return channel
    },
    createMessage: async (_parent, args: {text: string, senderId: number, channelId: number}, context: Context) =>{
        const { text, senderId, channelId } = args
        
        const sender = await context.prisma.user.findUnique({
        where: { id: senderId },
      })
      if (!sender) {
        throw new Error('Sender not found')
      }

       const channel = await context.prisma.channel.findUnique({
        where: { id: channelId },
      })
      if (!channel) {
        throw new Error('Channel not found')
      }

       const message = await context.prisma.message.create({
        data: {
          text: text,
          sender: {
            connect: { id: senderId },
          },
          channel: {
            connect: { id: channelId },
          },
        },
      })

       context.pubsub.publish(`messageSent-${channelId}`, { messageSent: message })

      return message
    },
     setUserOnlineStatus: async (_parent, args: { clerkId: string, isOnline: boolean }, context: Context) => {
    const user = await context.prisma.user.update({
      where: { clerkId: args.clerkId },
      data: { isOnline: args.isOnline },
    })

    if (!user) {
      throw new Error('User not found')
    }

    context.pubsub.publish('userOnlineStatusChanged', { userOnlineStatusChanged: user })

    return user
  }
  },
  Subscription: {
    messageSent: {
      subscribe: (_parent, args: { channelId: number }, context: Context) => {
        return context.pubsub.asyncIterator(`messageSent-${args.channelId}`)
    },
    resolve: (payload: {messageSent: Message}) => {
      return payload.messageSent
    }
  },
  userOnlineStatusChanged:  {
    subscribe: (_parent, _args, context: Context) => {
      return context.pubsub.asyncIterator('userOnlineStatusChanged')
    },
    resolve: (payload: { userOnlineStatusChanged: User }) => {
      return payload.userOnlineStatusChanged
    }
  }
}
}
