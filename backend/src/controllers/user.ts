import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { body, param, matchedData, validationResult } from 'express-validator'

import { DI } from '..'
import { AuthUserReq, UserReq } from '../types'

const router = Router()

router.get(
  '/:userId',
  param(['userId']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const result = validationResult(req)

      if (!result.isEmpty()) {
        return res.status(400).json({
          message: 'User ID is required',
        })
      }

      const { token } = req.cookies

      if (!token) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUserReq

      if (!payload) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const { userId } = req.params

      const user = await DI.userRepository.findOne({ id: userId })

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        })
      }

      res.json({
        message: 'User found',
        user,
      })
    } catch (error) {
      const err = error as Error
      res.status(500).json({ error: err.message })
    }
  },
)

router.get('/', async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUserReq

    if (!payload) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    const users = await DI.userRepository.findAll()

    res.json({
      message: 'Users found',
      users,
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ error: err.message })
  }
})

router.post(
  '/create',
  body(['name', 'email', 'password']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const result = validationResult(req)

      if (!result.isEmpty()) {
        return res.status(400).json({
          message: 'Name, email and password are required',
        })
      }

      const { token } = req.cookies

      if (!token) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUserReq

      if (!payload) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const { name, email, password } = matchedData(req) as UserReq

      const user = DI.userRepository.create(
        {
          name,
          email,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { persist: true },
      )

      res.json({
        message: 'User successful created',
        user,
      })
    } catch (error) {
      const err = error as Error
      res.status(500).json({ error: err.message })
    }
  },
)

router.put(
  '/:userId',
  param('userId').notEmpty().escape(),
  body(['email', 'name', 'password']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const result = validationResult(req)

      if (!result.isEmpty()) {
        return res.status(400).json({
          message: 'User ID, email, name and password are required',
        })
      }

      const { token } = req.cookies

      if (!token) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUserReq

      if (!payload) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const { userId } = req.params
      const { name, email, password } = matchedData(req) as UserReq

      const user = await DI.userRepository.findOne({ id: userId })

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        })
      }

      const newUser = await DI.userRepository.nativeUpdate(
        { id: userId },
        {
          name,
          email,
          password,
          updatedAt: new Date(),
        },
      )

      res.json({
        message: 'User successful updated',
        user: newUser,
      })
    } catch (error) {
      const err = error as Error
      res.status(500).json({ error: err.message })
    }
  },
)

router.delete(
  '/:userId',
  param('userId').notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const result = validationResult(req)

      if (!result.isEmpty()) {
        return res.status(400).json({
          message: 'User ID is required',
        })
      }

      const { token } = req.cookies

      if (!token) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUserReq

      if (!payload) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const { userId } = req.params

      const user = await DI.userRepository.findOne({ id: userId })

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        })
      }

      await DI.userRepository.nativeDelete({ id: userId })

      res.json({
        message: 'User successful deleted',
      })
    } catch (error) {
      const err = error as Error
      res.status(500).json({ error: err.message })
    }
  },
)

export const usersController = router
