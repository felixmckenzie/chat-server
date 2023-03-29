import request from 'supertest'
import{httpServer, main} from '../src/index'
import { context } from '../src/context'


beforeAll ( async () => {
await main()
})

afterAll( async () => {
    await httpServer.close()
    return context.prisma.$disconnect()
}) 

