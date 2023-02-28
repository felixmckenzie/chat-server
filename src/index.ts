import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import {json} from 'body-parser'
import { readFileSync } from 'fs'
import cors from 'cors'
import http from 'http'
import { checkJwt } from './middleware/auth'
import { permissions } from './middleware/permissions'
const app = express()
const httpServer = http.createServer(app)

const resolvers = {}

const typeDefs = readFileSync('./schemas/schema.graphql', {encoding: 'utf-8'})

async function createApolloServer(){
const server = new ApolloServer({
schema: applyMiddleware(makeExecutableSchema({typeDefs, resolvers}), permissions) ,
plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
})

await server.start()

return server
}

const main = async (): Promise<void> => {
const apolloServer = await createApolloServer()

const PORT = process.env.PORT || 4000

app.use(checkJwt)

app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(apolloServer,{
    context: async( {req}) => { 
        
        const user = req.auth || null
        return {user}
    },
}) )

app.listen({port: PORT}, ()=> {
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
})

}

(async () => {
    await main()
})()
