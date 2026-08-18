import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { loginSuccess } from '../store/authSlice'
import { loginUser } from '../services/authApi'
import { isAllowedRole } from '../utils/roles'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { user, token } = await loginUser(username, password)
      if (!isAllowedRole(user?.role)) {
        setError('This account role is not supported. Please contact the administrator.')
        return
      }
      dispatch(loginSuccess({ user, token }))
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative bg-sidebar overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, currentColor 0, currentColor 2px, transparent 2px, transparent 48px), repeating-linear-gradient(90deg, currentColor 0, currentColor 2px, transparent 2px, transparent 64px)',
          color: 'var(--sidebar-primary)'
        }} />

        <div className="relative z-10">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-sidebar-foreground/60">Community Operations</p>
        </div>

        <div className="relative z-10">
          <h1 className="font-heading text-6xl leading-[1.05] text-sidebar-primary mb-4">
            Smart<br />Society
          </h1>
          <p className="text-sidebar-foreground/70 text-sm max-w-xs">
            One dashboard for residents, guards, and administration — built for how a real society actually runs.
          </p>
        </div>

        <div className="relative z-10 font-mono text-xs text-sidebar-foreground/50">
          Admin · Resident · Guard
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-heading text-3xl text-primary">SmartSociety</h1>
          </div>

          <h2 className="font-heading text-2xl mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2.5 mt-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                placeholder="admin"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-input rounded-lg px-3 py-2.5 pr-10 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="••••••••"
                  autoComplete="current-password"
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
            <div className="text-right mt-2">
  <Link
    to="/forgot-password"
    className="text-sm text-primary hover:underline"
  >
    Forgot password?
  </Link>
</div>

            {error && (
              <p className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-sm text-muted-foreground text-center">
              Need an account?{' '}
              <Link to="/register" className="text-primary font-medium underline underline-offset-2">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
