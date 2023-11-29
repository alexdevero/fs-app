import { Request, Response, Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as Uuid } from 'uuid'
import { body, matchedData, validationResult } from 'express-validator'

import { DI } from '..'
import { AuthUserReq, UserReq } from '../types'
import { User } from './../entities/user'

const router = Router()

router.post(
  '/login',
  body(['email', 'password']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const result = validationResult(req)

      if (!result.isEmpty()) {
        return res.status(400).json({
          message: 'Email and password are required',
        })
      }

      const { email, password } = matchedData(req) as UserReq

      const user = await DI.em.findOneOrFail(User, { email })

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        })
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return res.status(401).json({
          message: 'Invalid password',
        })
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
      res.status(401).json({
        message: 'Login not successful',
        error: err.message,
      })
    }
  },
)

router.post('/logout', async (req: Request, res: Response) => {
  try {
    res.clearCookie('token').sendStatus(200)
  } catch (error) {
    const err = error as Error
    res.status(401).json({
      message: 'Logout not successful',
      error: err.message,
    })
  }
})

router.post(
  '/register',
  body(['name', 'email', 'password']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const result = validationResult(req)

      if (!result.isEmpty()) {
        return res.status(400).json({
          message: 'Name, email and password are required',
        })
      }

      const { name, email, password } = matchedData(req) as UserReq

      const existingUser = await DI.em.findOne(User, { email })

      if (existingUser) {
        return res.status(400).json({
          message: 'User already exists',
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = DI.em.create(User, {
        id: Uuid(),
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await DI.em.persistAndFlush(user)

      res.status(200).json({
        message: 'User successfully created',
        user,
      })
    } catch (error) {
      const err = error as Error
      res.status(401).json({
        message: 'User not successfully created',
        error: err.message,
      })
    }
  },
)

export const authController = router
