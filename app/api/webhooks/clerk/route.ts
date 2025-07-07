import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import prisma from '@/lib/prisma'

// Define interfaces for Clerk webhook data
interface ClerkEmailAddress {
  email_address: string;
  id: string;
}

interface ClerkUserData {
  id: string;
  email_addresses?: ClerkEmailAddress[];
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  image_url?: string | null;
}

interface ClerkEvent {
  data: ClerkUserData;
  object: string;
  type: string;
}

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

  let evt: ClerkEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkEvent
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

async function handleUserCreated(userData: ClerkUserData) {
  console.log('Creating user:', userData);
  
  try {
    // First check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id }
    });
    
    if (existingUser) {
      console.log('User already exists, updating:', userData.id);
      return await handleUserUpdated(userData);
    }
    
    // If user doesn't exist, create them
    const user = await prisma.user.create({
      data: {
        id: userData.id,
        email: userData.email_addresses?.[0]?.email_address || '',
        firstName: userData.first_name || null,
        lastName: userData.last_name || null,
        username: userData.username || null,
        profileImage: userData.image_url || null,
      },
    });
    
    console.log('User created successfully:', user);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function handleUserUpdated(userData: ClerkUserData) {
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

async function handleUserDeleted(userData: ClerkUserData) {
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