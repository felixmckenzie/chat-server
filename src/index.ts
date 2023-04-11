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
import { permissions } from './middleware/permissions'
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import { context } from './context'
import { isTokenValid } from './middleware/auth'
import { resolvers } from './resolvers/resolvers'


type TokenResponse = { error: string } | { decoded: JwtPayload } | { noTokenError: string };


const app = express()
const httpServer = http.createServer(app)
 
const typeDefs = readFileSync('src/schemas/schema.graphql', {encoding: 'utf-8'})
// const schema = applyMiddleware(makeExecutableSchema({typeDefs, resolvers}), permissions)
const schema = makeExecutableSchema({typeDefs, resolvers})
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

const serverCleanup = useServer({ 
schema,
context,
// onConnect: async (ctx) =>{
//    const {noTokenError, result}  = await isTokenValid(ctx.connectionParams?.token) as TokenResponse
  
//    if (noTokenError) {
//       throw new Error(noTokenError)
//     }

//     return result
// }
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

const main = async () => {
const apolloServer = await createApolloServer()

const PORT = process.env.PORT 

app.use(ClerkExpressWithAuth())
app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(apolloServer, {
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

(async () => {
    await main()
})()


export {createApolloServer, httpServer, app}