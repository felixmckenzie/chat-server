import { TestEnvironment } from 'jest-environment-node'
import { exec } from 'child_process'
import util from 'util'
import * as dotenv from 'dotenv'

dotenv.config()
const execAsync = util.promisify(exec)

class PrismaTestEnvironment extends TestEnvironment {
  constructor(config, _context) {
    super(config, _context)
    this.global.process.env.DATABASE_URL = process.env.DATABASE_URL
  }

  async setup() {
    console.log('Setting up PrismaTestEnvironment...')
    try {
      await execAsync('npx prisma migrate deploy --preview-feature')
      await execAsync('npm run seed')
    } catch (error) {
      console.error('Error running migrations:', error)
    }
    return super.setup()
  }

  async teardown() {
    console.log('Tearing down PrismaTestEnvironment...')
    try {
      await execAsync('npx prisma migrate reset --force')
    } catch (error) {
      console.error('Error resetting migrations:', error)
    }
  }
}

export default PrismaTestEnvironment
