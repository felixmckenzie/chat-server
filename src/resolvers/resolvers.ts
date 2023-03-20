import {Context} from '../context'
import { UserInput } from '../types/resolvers-types'

export const resolvers = {
    Query: {
        getUser: (_parent, args: {id: string}, context: Context ) => {
            return context.prisma.user.findUnique({
                where: {id: args.id || undefined}
            })
        },
        getChat: (_parent, args: {id: string}, context: Context) => {
            return context.prisma.chat.findUnique({
                where: {id: args.id || undefined}
            })
        },
        getAllUserChats: (_parent, args: {userInput: UserInput}, context: Context) => {
            return context.prisma.user.findUnique({
                where: {id: args.userInput.id || undefined, email: args.userInput.email}
            }).chats()
        }
    },
    Mutation: {


    },
    Subscription: {

    },
}