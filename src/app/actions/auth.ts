'use server'

import { signIn, signOut } from '@/auth'

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/onboarding' })
}

export async function logout() {
  await signOut({ redirectTo: '/login' })
}
