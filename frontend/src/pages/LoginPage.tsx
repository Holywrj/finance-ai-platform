import { useState, type SubmitEvent } from 'react'

import { login } from '../api/auth'
import './LoginPage.css'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const tokenResponse = await login({
        username,
        password,
      })

      localStorage.setItem('access_token', tokenResponse.access_token)

      console.log('Login successful.')
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="login-brand-mark">F</span>

          <div>
            <h1>Finance AI Platform</h1>
            <p>Enterprise Finance Management</p>
          </div>
        </div>

        <div className="login-header">
          <h2>Sign in</h2>
          <p>Sign in to access your finance workspace.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="login-footer">
          Finance AI Platform · Enterprise Financial Intelligence
        </p>
      </section>
    </main>
  )
}

export default LoginPage