import { userSignUpData } from './seedData'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const executeDbSeeding = async () => {
  for (const u of userSignUpData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log('Seeding finished.')
}

