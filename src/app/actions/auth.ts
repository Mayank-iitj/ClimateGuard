'use server'

import { signIn, signOut } from '@/auth'

export async function loginWithDemo() {
  await signIn('credentials', { redirectTo: '/onboarding' })
}

export async function logout() {
  await signOut({ redirectTo: '/login' })
}
