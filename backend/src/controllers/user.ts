import { type Request, type Response, Router } from 'express'
import { body, param, query } from 'express-validator'

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../services/user-service'

import type { UserReq } from '../types'

import { authenticated } from '../middleware/authenticated'

import { validateFields } from '../utils/validators'
import { handleError } from '../utils/error-handling'
import { Pagination } from '../types/pagination'

const router = Router()

router.get(
  '/:userId',
  authenticated,
  param(['userId']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const result = validateFields<{ userId: string }>(req, ['userId'])

      const { userId } = req.params

      const user = await getUserById(userId)

      if (!user) {
        throw new Error('User not found')
      }

      res.json({
        message: 'User found',
        user,
      })
    } catch (error) {
      const err = error as Error
      handleError(err, req, res, () => {})
    }
  },
)

router.get(
  '/',
  authenticated,
  query(['page', 'pageSize']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const { page, pageSize } = validateFields<Pagination>(req, ['page', 'pageSize'])

      const { users, ...pagination } = await getUsers(Number(page), Number(pageSize))

      res.json({
        message: 'Users found',
        users,
        pagination,
      })
    } catch (error) {
      const err = error as Error
      handleError(err, req, res, () => {})
    }
  },
)

router.post(
  '/create',
  authenticated,
  body(['name', 'email', 'password']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = validateFields<UserReq>(req, [
        'name',
        'email',
        'password',
      ])

      const user = await createUser(name, email, password)

      res.json({
        message: 'User successful created',
        user,
      })
    } catch (error) {
      const err = error as Error
      handleError(err, req, res, () => {})
    }
  },
)

router.put(
  '/:userId',
  authenticated,
  param('userId').notEmpty().escape(),
  body(['email', 'name']).notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const { name, email } = validateFields<UserReq>(req, ['userId', 'email', 'name'])

      const { userId } = req.params

      const user = await getUserById(userId)

      if (!user) {
        throw new Error('User not found')
      }

      const updatedUser = await updateUser(userId, name, email)

      res.json({
        message: 'User successful updated',
        user: updatedUser,
      })
    } catch (error) {
      const err = error as Error
      handleError(err, req, res, () => {})
    }
  },
)

router.delete(
  '/:userId',
  authenticated,
  param('userId').notEmpty().escape(),
  async (req: Request, res: Response) => {
    try {
      const result = validateFields<{ userId: string }>(req, ['userId'])

      const { userId } = req.params

      const user = await getUserById(userId)

      if (!user) {
        throw new Error('User not found')
      }

      await deleteUser(userId)

      res.json({
        message: 'User successful deleted',
      })
    } catch (error) {
      const err = error as Error
      handleError(err, req, res, () => {})
    }
  },
)

export const usersController = router
