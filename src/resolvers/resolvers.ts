import { Context } from '../context'
import { CreateChannelInput, UserInput, UserRegisterInput, Channel } from '../types/resolvers-types'
import { auth0ManagemenClient } from '../utils/auth0.js'
import bcrypt from 'bcrypt'
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
        })
        .Channels()
    },
    hello: () => 'Hello, world!',
  },
  Mutation: {
    createUser: async (_parent, args: { input: UserRegisterInput }, context: Context) => {
      const hashedPassword = await bcrypt.hash(args.input.password, 10)

      const auth0User = await auth0ManagemenClient.createUser({
        connection: 'Username-Password-Authentication',
        email: args.input.email,
        password: hashedPassword,
        user_metadata: {
          givenName: args.input.givenName,
          familyName: args.input.familyName,
        },
      })

      let user
      try {
        user = await context.prisma.user.create({
          data: {
            givenName: args.input.givenName,
            familyName: args.input.familyName,
            mobilePhone: args.input.mobilePhone,
            email: args.input.email,
            password: hashedPassword,
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
  },
  Subscription: {},
}
