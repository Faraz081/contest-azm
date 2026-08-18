import api from './api'

export const loginUser = async (username, password) => {
  try {
    const res = await api.post('/auth/login', { username, password })
    return res.data
  } catch (err) {
    const msg = err.response?.data?.message || 'Invalid username or password'
    throw new Error(msg)
  }
}

export const registerUser = async (username, password, confirmPassword, email, name = '') => {
  try {
    const payload = { username, password, confirmPassword, email }

    if (name && name.trim()) {
      payload.name = name.trim()
    }

    const res = await api.post('/auth/register', payload)
    return res.data
  } catch (err) {
    const msg = err.response?.data?.message || 'Registration failed'
    throw new Error(msg)
  }
}

export const getProfile = async () => {
  try {
    const res = await api.get('/auth/me')
    return res.data.data
  } catch (err) {
    const msg = err.response?.data?.message || 'Could not fetch profile'
    throw new Error(msg)
  }
}

export const forgotPassword = async (email) => {
  try {
    const res = await api.post('/auth/forgot-password', {
      email
    })

    return res.data
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      'Could not send OTP'

    throw new Error(msg)
  }
}


export const verifyOTP = async (email, otp) => {
  try {
    const res = await api.post('/auth/verify-otp', {
      email,
      otp
    })

    return res.data
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      'Invalid OTP'

    throw new Error(msg)
  }
}


export const resetPassword = async (
  email,
  otp,
  newPassword,
  confirmPassword
) => {
  try {
    const res = await api.post('/auth/reset-password', {
      email,
      otp,
      newPassword,
      confirmPassword
    })

    return res.data
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      'Could not reset password'

    throw new Error(msg)
  }
}