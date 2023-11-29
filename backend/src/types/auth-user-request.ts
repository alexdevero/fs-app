import type { Request } from 'express'

export type AuthUserRequest = {
  id: string
  email: string
  iat: number
  exp: number
}

export type AuthenticatedRequest = Request & { user: AuthUserRequest }
