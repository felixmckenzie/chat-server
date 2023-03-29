import {TestEnvironment} from 'jest-environment-node'
import { exec } from 'child_process'

class PrismaTestEnvironment extends TestEnvironment {
  constructor(config, _context) {
    super(config, _context)
    this.global.process.env = process.env.test.DATABASE_URL
  }
  async setup() {
    await exec('NODE_ENV=test npx prisma migrate deploy --preview-feature')

    return super.setup()
  }

  async teardown() {
    await exec('NODE_ENV=test npx prisma migrate reset --force')
  }
}

export default PrismaTestEnvironment
