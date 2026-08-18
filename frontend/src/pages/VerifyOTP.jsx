import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { verifyOTP } from '../services/authApi'

const VerifyOTP = () => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      navigate('/forgot-password')
      return
    }

    setError('')
    setLoading(true)

    try {
      await verifyOTP(email, otp)

      navigate('/reset-password', {
        state: {
          email,
          otp
        }
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
          Verify OTP
        </h1>

        <p className="text-sm text-muted-foreground mb-8">
          Enter the 6-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
              OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full border border-input rounded-lg px-3 py-2.5 mt-1.5 bg-background text-center tracking-[0.5em] text-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="000000"
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
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <p className="text-sm text-muted-foreground text-center">
            <Link
              to="/forgot-password"
              className="text-primary font-medium underline"
            >
              Send OTP again
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default VerifyOTP