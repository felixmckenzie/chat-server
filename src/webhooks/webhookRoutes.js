import { Webhook } from 'svix'
import express from 'express'
import bodyParser from 'body-parser'
import { context, Context } from '../context'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

const webhookSecret = process.env.WEB_HOOK_SECRET

router.post('/create-user', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const payload = req.body
  const headers = req.headers
  const webhook = new Webhook(webhookSecret)

  try {
    const msg = await webhook.verify(payload, headers)
    console.log('Received webhook:', msg)
    const { username, id, profile_image_url } = msg.data
    const { emailAddress } = msg.data.email_addresses[0]
    const newUser = await context.prisma.user.create({
      data: {
        clerkId: id,
        username: username,
        ...(profile_image_url ? { avatar: profile_image_url } : {}),
        email: emailAddress,
      },
    })
    res.status(200).json(newUser)
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
