import { context, Context } from '../context'
import { CreateChannelInput, UserInput, UserRegisterInput, Channel, Message } from '../types/resolvers-types'
import { auth0ManagemenClient } from '../utils/auth0.js'
import jwt from 'jsonwebtoken'

export const resolvers = {
  Query: {
    getUser: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.user.findUnique({
        where: { id: args.id || undefined },
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
    hello: () => 'Hello, world!',
  },
  Mutation: {
    createUser: async (_parent, args: { input: UserRegisterInput }, context: Context) => {

      let user
      try {
        user = await context.prisma.user.create({
          data: {
            givenName: args.input.givenName,
            familyName: args.input.familyName,
            email: args.input.email,
            isActive: args.input.isActive,
            avatar: args.input.avatar,
            role: args.input.role,
          },
        })
      } catch (error) {
        console.error('Error creating user with Prisma:', error)
      }
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return { user: user, token: token }
    },
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
