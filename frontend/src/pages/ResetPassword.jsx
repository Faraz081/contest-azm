import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { resetPassword } from '../services/authApi'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email
  const otp = location.state?.otp

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !otp) {
      navigate('/forgot-password')
      return
    }

    setError('')
    setLoading(true)

    try {
      await resetPassword(
        email,
        otp,
        newPassword,
        confirmPassword
      )

      navigate('/login')
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
          Reset Password
        </h1>

        <p className="text-sm text-muted-foreground mb-8">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-input rounded-lg px-3 py-2.5 mt-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-input rounded-lg px-3 py-2.5 mt-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="••••••••"
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
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default ResetPassword