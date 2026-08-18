import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { registerUser, loginUser } from '../services/authApi'
import { loginSuccess } from '../store/authSlice'
import { isAllowedRole } from '../utils/roles'

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.username.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError('Please fill in all required fields.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Please provide a valid email address.')
      return
    }

    setLoading(true)

    try {
      await registerUser(
        form.username.trim(),
        form.password,
        form.confirmPassword,
        form.email.trim()
      )

      const loginResult = await loginUser(form.username.trim(), form.password)
      if (!isAllowedRole(loginResult?.user?.role)) {
        setError('This account role is not supported. Please contact the administrator.')
        return
      }
      dispatch(loginSuccess({ user: loginResult.user, token: loginResult.token }))
      setSuccess('Account created successfully. Redirecting...')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex bg-background lg:flex-row-reverse">
      <div className="hidden lg:flex lg:w-1/2 relative bg-sidebar overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, currentColor 0, currentColor 2px, transparent 2px, transparent 48px), repeating-linear-gradient(90deg, currentColor 0, currentColor 2px, transparent 2px, transparent 64px)',
          color: 'var(--sidebar-primary)'
        }} />

        <div className="relative z-10">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-sidebar-foreground/60">Community Access</p>
        </div>

        <div className="relative z-10">
          <h1 className="font-heading text-6xl leading-[1.05] text-sidebar-primary mb-4">
            Smart<br />Society
          </h1>
          <p className="text-sidebar-foreground/70 text-sm max-w-xs">
            Join your residential community with a secure, role-based account.
          </p>
        </div>

        <div className="relative z-10 font-mono text-xs text-sidebar-foreground/50">
          Secure accounts · Resident access
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-heading text-3xl text-primary">SmartSociety</h1>
          </div>

          <h2 className="font-heading text-2xl mb-1">Create account</h2>
          <p className="text-sm text-muted-foreground mb-6">Set up your access in a minute.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-input rounded-lg px-3 py-2.5 mt-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                placeholder="ali.khan"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-input rounded-lg px-3 py-2.5 mt-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                placeholder="you@smartsociety.pk"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-input rounded-lg px-3 py-2.5 pr-10 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="Use 6+ characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Confirm Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-input rounded-lg px-3 py-2.5 pr-10 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {success && (
              <p className="text-emerald-600 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium underline underline-offset-2">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
