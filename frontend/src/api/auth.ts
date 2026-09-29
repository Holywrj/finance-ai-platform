import type { LoginCredentials, TokenResponse } from '../types/auth'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export async function login(
  credentials: LoginCredentials,
): Promise<TokenResponse> {
  const body = new URLSearchParams()

  body.set('username', credentials.username)
  body.set('password', credentials.password)

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)

    throw new Error(
      errorData?.detail ?? 'Login failed. Please check your credentials.',
    )
  }

  return response.json() as Promise<TokenResponse>
}