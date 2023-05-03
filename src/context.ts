import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
console.log('Prisma client path:', require.resolve('@prisma/client'))

const prisma = new PrismaClient()
const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
}

export const context: Context = {
  prisma: prisma,
  pubsub: pubsub
}