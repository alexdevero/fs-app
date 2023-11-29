import { type Request, type Response, Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'

import type { AuthUserReq, UserReq } from '../types'

import { createUser, getUserByEmail } from '../services/user-service'

import { validateFields } from '../utils/validators'
import { handleError } from '../utils/error-handling'

const router = Router()

router.post(
  '/login',
  body(['email', 'password']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = validateFields<UserReq>(req, ['email', 'password'])

      const user = await getUserByEmail(email)

      if (!user) {
        throw new Error('User not found')
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        // Keep credentials err message vague to prevent brute force attacks
        throw new Error('Invalid credentials')
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, password: user.password } as AuthUserReq,
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' },
      )

      res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600000,
        })
        .json({
          message: 'Login successful',
          token,
        })
    } catch (error) {
      const err = error as Error
      handleError(err, req, res, () => {})
    }
  },
)

router.post('/logout', async (req: Request, res: Response) => {
  try {
    res.clearCookie('token').sendStatus(200)
  } catch (error) {
    const err = error as Error
    handleError(err, req, res, () => {})
  }
})

router.post(
  '/register',
  body(['name', 'email', 'password']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = validateFields<UserReq>(req, [
        'name',
        'email',
        'password',
      ])

      const existingUser = await getUserByEmail(email)

      if (existingUser) {
        throw new Error('User already exists')
      }

      const user = await createUser(name, email, password)

      res.status(200).json({
        message: 'User successfully created',
        user,
      })
    } catch (error) {
      const err = error as Error
      handleError(err, req, res, () => {})
    }
  },
)

export const authController = router
