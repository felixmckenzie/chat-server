import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import { WebSocketServer } from 'ws'
import {useServer} from 'graphql-ws/lib/use/ws'
import {json} from 'body-parser'
import { readFileSync } from 'fs'
import cors from 'cors'
import http from 'http'
import { GraphQLError } from 'graphql'
import { createClerkClient } from '@clerk/clerk-sdk-node'
import { context } from './context'
import { resolvers } from './resolvers/resolvers'
import dotenv from 'dotenv'

dotenv.config()

const corsOptions: cors.CorsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}


const app = express()
const httpServer = http.createServer(app)
 
const typeDefs = readFileSync('src/schemas/schema.graphql', {encoding: 'utf-8'})
const schema = makeExecutableSchema({typeDefs, resolvers})
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

const serverCleanup = useServer({ 
schema,
context,
},wsServer)

 async function createApolloServer(){
const server = new ApolloServer({
 schema,
plugins: [ApolloServerPluginDrainHttpServer({httpServer}),
{
    async serverWillStart() {
        return {
            async drainServer() {
                await serverCleanup.dispose()
            }
        }
    }
}
]
})

await server.start()

return server
}

export const main = async () => {
const apolloServer = await createApolloServer()

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const PORT = process.env.PORT || 4000

app.use('/graphql',cors<cors.CorsRequest>(corsOptions), clerk.expressWithAuth(), json(), expressMiddleware(apolloServer, {
    context: async ({req}) => {
      
        if(!req.auth.userId){
            throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      })
        }
       return context
    }
}) )

httpServer.listen({port: PORT}, ()=> {
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`)
})


}




export {createApolloServer, httpServer, app}