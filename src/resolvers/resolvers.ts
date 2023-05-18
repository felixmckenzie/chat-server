import { Context } from '../context'
import { CreateChatInput, UserInput, Message, FriendRequestStatus, User } from '../types/resolvers-types'

export const resolvers = {
  Query: {
    getUser: (_parent, args: { clerkId: string }, context: Context) => {
      return context.prisma.user.findUnique({
        where: { clerkId: args.clerkId || undefined }, include:{friends: true,  receivedRequests: {
          include: {
            sender: true,
          },
        },},
      })
    },
    getChatBetweenUsers: (_parent, args: { userIds: string[] }, context: Context) => {
      const chats = context.prisma.chat.findMany({
        where: {
          members:{
            every:{
              clerkId:{
                in: [...args.userIds]
              }
            }
          }
        },
        include:{
          messages: {
            include:{
              sender: true,
            }
          },
          members: true,
        }
      })
      return chats
    },
    getAllUserChats: (_parent, args: { userInput: UserInput }, context: Context) => {
      return context.prisma.user
        .findUnique({
          where: { id: args.userInput.id || undefined, email: args.userInput.email },
        }).chats()
     
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
    sendFriendRequest: async (_parent, args: {clerkId: string, contactUserEmail: string}, context: Context ) => {
      const {clerkId, contactUserEmail} = args 

      const requestSender = await context.prisma.user.findUnique({where: {clerkId: clerkId},  include: {
         friends: true,
      }})

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

      const existingContact = requestSender.friends.find((friend) => friend.clerkId === requestReceiver.clerkId)

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
          
      const request = await context.prisma.friendRequest.findUnique({ where: { id: args.requestId }, include: {sender: true, receiver: true} })
          if (!request) {
             throw new Error('friend request not found')
          }

        if(args.status === 'ACCEPTED'){
          await context.prisma.user.update({
            where: {clerkId: request.senderClerkId},
            data: {
              friends: { 
                connect:{clerkId: request.receiverClerkId}
              },
            }
          })

           await context.prisma.user.update({
          where: { clerkId: request.receiverClerkId },
          data: {
            friends: {
              connect: { clerkId: request.senderClerkId },
            },
          },
        })
        }

       await context.prisma.friendRequest.delete({
                                where: { id: args.requestId }
                              })

      return request.receiver

    }
    ,
    createChat: async (_parent, args: { input: CreateChatInput }, context: Context) => {

      const { name, userIds } = args.input

      const users = await context.prisma.user.findMany({
        where: {
          clerkId: {
            in: userIds,
          },
        },
      })
      
      if (users.some((user) => !user)) {
        throw new Error('One or more users not found')
      }

      const chat = await context.prisma.chat.create({
        data: {
         ...(name && {name: name}),
          members: {
            connect: users.map((user) => ({ id: user.id })),
          },
        },
        include: {
            members: true, // Include the members relation in the response
        },
      })  

      return chat
    },
    createMessage: async (_parent, args: {text: string, senderId: string, chatId: number}, context: Context) =>{
        const { text, senderId, chatId } = args
        
        const sender = await context.prisma.user.findUnique({
        where: { clerkId: senderId },
      })
      if (!sender) {
        throw new Error('Sender not found')
      }

       const chat = await context.prisma.chat.findUnique({
        where: { id: chatId },
      })
      
      if (!chat) {
        throw new Error('Chat not found')
      }

       const message = await context.prisma.message.create({
        data: {
          text: text,
          sender: {
            connect: { clerkId: senderId },
          },
          chat: {
            connect: { id: chatId },
          },
        },
        include: {sender: true}
      })

       context.pubsub.publish(`messageSent-${chatId}`, { messageSent: message })

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
      subscribe: (_parent, args: { chatId: number }, context: Context) => {
        return context.pubsub.asyncIterator(`messageSent-${args.chatId}`)
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
