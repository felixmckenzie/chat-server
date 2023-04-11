import { Role } from '@prisma/client'

interface UserRegisterInput {
  givenName: string
  familyName: string
  email: string
  isActive: boolean
  avatar: string
  role: Role,
}

export const userSignUpData: UserRegisterInput[] = [
  {
    givenName: 'Alice',
    familyName: 'Smith',
    email: 'alice.smith@example.com',
    isActive: true,
    avatar: 'https://example.com/alice-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Bob',
    familyName: 'Johnson',
    email: 'bob.johnson@example.com',
    isActive: true,
    avatar: 'https://example.com/bob-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Carol',
    familyName: 'Williams',
    email: 'carol.williams@example.com',
    isActive: false,
    avatar: 'https://example.com/carol-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'David',
    familyName: 'Brown',
    email: 'david.brown@example.com',
    isActive: true,
    avatar: 'https://example.com/david-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Eva',
    familyName: 'Jones',
    email: 'eva.jones@example.com',
    isActive: true,
    avatar: 'https://example.com/eva-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Frank',
    familyName: 'Garcia',
    email: 'frank.garcia@example.com',
    isActive: false,
    avatar: 'https://example.com/frank-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Grace',
    familyName: 'Miller',
    email: 'grace.miller@example.com',
    isActive: true,
    avatar: 'https://example.com/grace-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Harry',
    familyName: 'Davis',
    email: 'harry.davis@example.com',
    isActive: true,
    avatar: 'https://example.com/harry-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Ivy',
    familyName: 'Rodriguez',
    email: 'ivy.rodriguez@example.com',
    isActive: false,
    avatar: 'https://example.com/ivy-avatar.jpg',
    role: Role.REGULAR,
  },
]
