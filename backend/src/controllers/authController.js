import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { sendOTPEmail } from '../services/emailService.js'

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password.'
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
        flat_id: user.flat_id
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        flat_id: user.flat_id
      }
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, email, name } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, and email are required.'
      });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim();

    const existingUser = await User.findOne({
      $or: [{ username: normalizedUsername }, { email: normalizedEmail.toLowerCase() }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username or email already in use.'
      });
    }

    const user = await User.create({
      username: normalizedUsername,
      password,
      email: normalizedEmail.toLowerCase(),
      name: name || '',
      role: 'Resident',
      flat_id: null
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
        flat_id: user.flat_id
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        flat_id: user.flat_id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email || '',
        name: user.name || '',
        role: user.role,
        flat_id: user.flat_id
      }
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your email address.'
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const user = await User.findOne({
      email: normalizedEmail
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address.'
      })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000)

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordOTP: otp,
          resetPasswordOTPExpires: otpExpires
        }
      }
    )

    const updatedUser = await User.findById(user._id)

    console.log('================================')
    console.log('EMAIL:', updatedUser.email)
    console.log('OTP:', updatedUser.resetPasswordOTP)
    console.log('OTP EXPIRES:', updatedUser.resetPasswordOTPExpires)
    console.log('================================')

    await sendOTPEmail(updatedUser.email, otp)

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email.'
    })
  } catch (error) {
    console.error('FORGOT PASSWORD ERROR:', error)
    next(error)
  }
}

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body

    console.log('================================')
    console.log('VERIFY EMAIL:', email)
    console.log('VERIFY OTP:', otp)
    console.log('================================')

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required.'
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const user = await User.findOne({
      email: normalizedEmail
    })

    console.log('USER:', user)
    console.log('DB OTP:', user?.resetPasswordOTP)
    console.log('DB OTP EXPIRES:', user?.resetPasswordOTPExpires)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }

    if (!user.resetPasswordOTP) {
      return res.status(400).json({
        success: false,
        message: 'No OTP request found.'
      })
    }

    if (
      !user.resetPasswordOTPExpires ||
      user.resetPasswordOTPExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired.'
      })
    }

    if (user.resetPasswordOTP !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully.'
    })
  } catch (error) {
    console.error('VERIFY OTP ERROR:', error)
    next(error)
  }
}


export const resetPassword = async (req, res, next) => {
  try {
    const {
      email,
      otp,
      newPassword,
      confirmPassword
    } = req.body

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.'
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const user = await User.findOne({
      email: normalizedEmail
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }

    if (!user.resetPasswordOTP) {
      return res.status(400).json({
        success: false,
        message: 'No OTP request found.'
      })
    }

    if (
      !user.resetPasswordOTPExpires ||
      user.resetPasswordOTPExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired.'
      })
    }

    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP.'
      })
    }

    user.password = newPassword
    user.resetPasswordOTP = null
    user.resetPasswordOTPExpires = null

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Password reset successfully.'
    })
  } catch (error) {
    next(error)
  }
}