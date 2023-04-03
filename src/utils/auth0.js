import {ManagementClient} from 'auth0'

export  const auth0ManagemenClient = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'create:users update:users',
})