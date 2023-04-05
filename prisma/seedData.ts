import { Role } from '@prisma/client'

interface UserRegisterInput {
  givenName: string
  familyName: string
  email: string
  password: string
  mobilePhone: string
  isActive: boolean
  avatar: string
  role: Role,
}

export const userSignUpData: UserRegisterInput[] = [
  {
    givenName: 'Alice',
    familyName: 'Smith',
    email: 'alice.smith@example.com',
    password: 'Alic3P@ss!',
    mobilePhone: '555-111-2222',
    isActive: true,
    avatar: 'https://example.com/alice-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Bob',
    familyName: 'Johnson',
    email: 'bob.johnson@example.com',
    password: 'B0bP@ss!',
    mobilePhone: '555-111-3333',
    isActive: true,
    avatar: 'https://example.com/bob-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Carol',
    familyName: 'Williams',
    email: 'carol.williams@example.com',
    password: 'C@r0lP@ss!',
    mobilePhone: '555-111-4444',
    isActive: false,
    avatar: 'https://example.com/carol-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'David',
    familyName: 'Brown',
    email: 'david.brown@example.com',
    password: 'D@v1dP@ss!',
    mobilePhone: '555-111-5555',
    isActive: true,
    avatar: 'https://example.com/david-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Eva',
    familyName: 'Jones',
    email: 'eva.jones@example.com',
    password: '3v@P@ss!',
    mobilePhone: '555-111-6666',
    isActive: true,
    avatar: 'https://example.com/eva-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Frank',
    familyName: 'Garcia',
    email: 'frank.garcia@example.com',
    password: 'Fr@nkP@ss!',
    mobilePhone: '555-111-7777',
    isActive: false,
    avatar: 'https://example.com/frank-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Grace',
    familyName: 'Miller',
    email: 'grace.miller@example.com',
    password: 'Gr@c3P@ss!',
    mobilePhone: '555-111-8888',
    isActive: true,
    avatar: 'https://example.com/grace-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Harry',
    familyName: 'Davis',
    email: 'harry.davis@example.com',
    password: 'H@rryP@ss!',
    mobilePhone: '555-111-9999',
    isActive: true,
    avatar: 'https://example.com/harry-avatar.jpg',
    role: Role.REGULAR,
  },
  {
    givenName: 'Ivy',
    familyName: 'Rodriguez',
    email: 'ivy.rodriguez@example.com',
    password: '1vyP@ss!',
    mobilePhone: '555-111-0000',
    isActive: false,
    avatar: 'https://example.com/ivy-avatar.jpg',
    role: Role.REGULAR,
  },
]
