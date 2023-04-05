import {createApolloServer, app} from '../src/index'
import { context } from '../src/context'
import { ApolloServer} from '@apollo/server'
import request from 'supertest'
import { auth0ManagemenClient } from '../src/utils/auth0.js'


console.log(`The connection URL is ${process.env.DATABASE_URL}`)

let server: ApolloServer

beforeAll ( async () => {
     server = await createApolloServer()
})

afterAll( async () => {
    await context.prisma.user.deleteMany()
    await server.stop()
    return context.prisma.$disconnect()
}) 


describe('GraphQL Server', () => {
  
    test('Query: hello', async () => {
    const query = `
      query {
        hello
      }
    `

    const response = await request(app)
      .post('/graphql')
      .send({ query })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.data.hello).toBe('Hello, world!')
  }),

  test('Should create a new user and return user object and token', async () => {
   
    const mutation = `mutation CreateUser($input: UserRegisterInput!) {
        createUser(input: $input) {
           user { 
            givenName
            familyName
            mobilePhone
            email
            avatar
            role
            isActive
            password
           }
        }
      }
    `
     const variables = {
      input: {
        givenName: 'John',
        familyName: 'Doe',
        mobilePhone: '1234567890',
        email: 'john.doe@example.com',
        avatar: 'https://example.com/avatar.jpg',
        isActive: true,
        role: 'REGULAR',
        password: 'testingPassWord123!',
      },
    }

    jest.spyOn(auth0ManagemenClient, 'createUser').mockResolvedValue({ user_id: 'auth0|12345' })

     const response = await request(app)
      .post('/graphql')
      .send({ query: mutation, variables })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

      const expectedUser = {
            givenName: variables.input.givenName,
            familyName: variables.input.familyName,
            mobilePhone: variables.input.mobilePhone,
            email: variables.input.email,
            avatar: variables.input.avatar,
            role: variables.input.role,
            isActive: variables.input.isActive,
        }

 
    expect(response.body.errors).toBeUndefined()
    expect(response.body.data.createUser.user).toMatchObject(expectedUser)

  }),

  test('creates a channel with the provided name and users', async () => {
    
    const channelMutation =  `mutation CreateChannel($input: CreateChannelInput!) {
        createChannel(input: $input) {
           id
           name 
           members {
            id
            givenName
            email
           }
        }
      }
    `
      const variables = {
        input: {
          name: 'testChannel123',
          userIds: [1,2,3,4]
        }
      }

      const response = await request(app)
      .post('/graphql')
      .send({ query: channelMutation, variables })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

      expect(response.body.errors).toBeUndefined()
      expect(response.body.data.createChannel.name).toEqual('testChannel123')
      expect(response.body.data.createChannel.members[0].givenName).toEqual('Alice')
      expect(response.body.data.createChannel.members[0].email).toEqual('alice.smith@example.com')
  })



})






