import { expressjwt } from 'express-jwt'
import { config } from 'dotenv'
import {JwksClient} from 'jwks-rsa'
import { verify } from 'jsonwebtoken'

const client = new JwksClient({
     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

const getKey = async (header) => {
    const key = await client.getSigningKey(header.kid)
    const signingKey = key.getPublicKey
    return signingKey
}

const isTokenValid = async (token) => {
if (token) {
     const bearerToken = token.split(' ')

     const result = new Promise((resolve, reject) => {
          verify(bearerToken[1], getKey, (err, decoded) => {
               if (err) {
                    reject({err})
               }

               if(decoded) {
                    resolve({decoded})
               }
          })
     })
     return result
}

const noTokenError = {error: 'No token provided'}

return noTokenError

}



export {isTokenValid}