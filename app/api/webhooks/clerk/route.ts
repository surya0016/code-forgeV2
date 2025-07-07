import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import prisma from '@/lib/prisma'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

export async function POST(req: Request) {
  if (!webhookSecret) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to your environment variables')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(webhookSecret)

  let evt: any

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  const { id } = evt.data
  const eventType = evt.type

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  // Handle the webhook
  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data)
        break
      case 'user.updated':
        await handleUserUpdated(evt.data)
        break
      case 'user.deleted':
        await handleUserDeleted(evt.data)
        break
      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return new Response('Error processing webhook', { status: 500 })
  }
}

async function handleUserCreated(userData: any) {
  console.log('Creating user:', userData)
  
  try {
    const user = await prisma.user.create({
      data: {
        id: userData.id,
        email: userData.email_addresses?.[0]?.email_address || '',
        firstName: userData.first_name || null,
        lastName: userData.last_name || null,
        username: userData.username || null,
        profileImage: userData.image_url || null,
        // Default preferences
        preferredLanguage: 'PYTHON',
        theme: 'dark',
        totalSubmissions: 0,
        solvedProblems: 0,
      },
    })
    
    console.log('User created successfully:', user)
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

async function handleUserUpdated(userData: any) {
  console.log('Updating user:', userData)
  
  try {
    const user = await prisma.user.update({
      where: { id: userData.id },
      data: {
        email: userData.email_addresses?.[0]?.email_address || '',
        firstName: userData.first_name || null,
        lastName: userData.last_name || null,
        username: userData.username || null,
        profileImage: userData.image_url || null,
        updatedAt: new Date(),
      },
    })
    
    console.log('User updated successfully:', user)
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

async function handleUserDeleted(userData: any) {
  console.log('Deleting user:', userData)
  
  try {
    await prisma.user.delete({
      where: { id: userData.id },
    })
    
    console.log('User deleted successfully')
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}