import path from 'path'
import { defaults } from 'jest-config'
import type {Config} from 'jest'

/** @type {import('@jest/types').Config.InitialOptions} */
const config: Config = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
},
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
  testEnvironment: path.join(__dirname, 'prisma', 'prisma-test-environment.js'),
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
transformIgnorePatterns: ['/node_modules/(?!(auth0)/)'],
 transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
}

export default config

