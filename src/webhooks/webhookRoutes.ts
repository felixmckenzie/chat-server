import { Webhook } from 'svix'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

const webhookSecret = process.env.WEB_HOOK_SECRET

router.post('/create-user', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body
  const headers = req.headers
  const webhook = new Webhook(webhookSecret)
    const requiredHeaders = {
  'svix-id': Array.isArray(headers['svix-id']) ? headers['svix-id'].join(' ') : headers['svix-id'],
  'svix-timestamp': Array.isArray(headers['svix-timestamp']) ? headers['svix-timestamp'].join(' ') : headers['svix-timestamp'],
  'svix-signature': Array.isArray(headers['svix-signature']) ? headers['svix-signature'].join(' ') : headers['svix-signature'],
}
   try {
    const msg = await webhook.verify(payload, requiredHeaders)
    console.log('Received webhook:', msg)
    res.status(200).send('Webhook received')
  } catch (e) {
    console.error('Error:', e)
    res.status(400).send('Webhook verification failed')
  }
})

// router.post('/update-user', async (req, res) => {
// })

// router.post('/delete-user', async (req, res) => {
// })

export default router