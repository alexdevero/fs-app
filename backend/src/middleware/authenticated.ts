import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

import type { AuthUserRequest, AuthenticatedRequest } from '../types/auth-user-request'

export function authenticated(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string)

    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    ;(req as AuthenticatedRequest).user = payload as AuthUserRequest

    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
