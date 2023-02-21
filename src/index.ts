import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import {json} from 'body-parser'
import cors from 'cors'
import http from 'http'


const app = express()
const httpServer = http.createServer(app)

async function createApolloServer(){
const server = new ApolloServer({
typeDefs,
resolvers,
plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
})

await server.start()

return server
}

const main = async (): Promise<void> => {
const apolloServer = await createApolloServer()

const PORT = process.env.PORT || 4000

app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(apolloServer) )

app.listen({port: PORT}, ()=> {
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
})

}

(async () => {
    await main()
})()
