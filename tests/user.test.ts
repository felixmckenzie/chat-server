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
           user{ 
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
            amilyName: variables.input.familyName,
            mobilePhone: variables.input.mobilePhone,
            email: variables.input.email,
            avatar: variables.input.avatar,
            role: variables.input.role,
            isActive: variables.input.isActive,
        }

 
    expect(response.body.errors).toBeUndefined()
    expect(response.body.data.createUser.user).toMatchObject(expectedUser)

  })



})





afterAll( async () => {
    await context.prisma.user.deleteMany()
    await server.stop()
    return context.prisma.$disconnect()
}) 

