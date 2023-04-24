import { Context, context } from '../context'
import { CreateChannelInput, UserInput, UserRegisterInput, Channel, Message, FriendRequestStatus } from '../types/resolvers-types'

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
  },
  Mutation: {
    createUser: async (_parent, args: { input: UserRegisterInput }, context: Context) => {

      try{
         const user = await context.prisma.user.create({
          data: {
           username: args.input.username,
            about: args.input.about,
            email: args.input.email,
            isActive: args.input.isActive,
            avatar: args.input.avatar,
            role: args.input.role,
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

      const currentUser = await context.prisma.user.findUnique({where: {clerkId: clerkId}})

      if(!currentUser){
        throw new Error('Current User Not Found')
      }

      const contactUser = await context.prisma.user.findUnique({where: {email: contactUserEmail}})
      if(!contactUser){
        throw new Error('Contact Not Found')
      }

      if(currentUser.clerkId === contactUser.clerkId){
        throw new Error('Cannot Add Yourself As A Contact')
      }

      const existingContact = await context.prisma.contact.findFirst({where:{
        userId: currentUser.id,
        contactUserId: contactUser.id,
      }})

      if(existingContact){
        throw new Error('Contact Already Exists')
      }
      
      
      const friendRequest = await context.prisma.friendRequest.create({
        data: {
            sender: { connect: { id: currentUser.id } },
            receiver: { connect: { id: contactUser.id } },
            status: 'PENDING',
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
              user:{connect:{id: request.senderId}},
              contactUser: {connect:{id: request.receiverId}},
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
  }
}
}
