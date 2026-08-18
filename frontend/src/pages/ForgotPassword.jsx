import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { forgotPassword } from '../services/authApi'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await forgotPassword(email)

      navigate('/verify-otp', {
        state: { email }
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">

        <h1 className="font-heading text-3xl mb-2">
          Forgot Password?
        </h1>

        <p className="text-sm text-muted-foreground mb-8">
          Enter your email and we'll send you an OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-input rounded-lg px-3 py-2.5 mt-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="you@gmail.com"
              required
            />
          </div>

          {error && (
            <p className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>

          <p className="text-sm text-muted-foreground text-center">
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-primary font-medium underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default ForgotPassword