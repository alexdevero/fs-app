import type { Request, Response } from 'express'

import { ErrorKeys } from '../types/error-keys'
import { FieldError } from './errors'

export function handleError(
  err: Error | FieldError,
  req: Request,
  res: Response,
  next: Function,
) {
  if (err.message === 'Validation failed') {
    return res.status(400).json({
      error_key: ErrorKeys.Validation_failed,
      message: 'Email and password are required',
      ...(err instanceof FieldError ? { errors: err.fields } : {}),
    })
  }

  if (err.message === 'User already exists') {
    return res.status(400).json({
      error_key: ErrorKeys.User_already_exists,
      message: 'User already exists',
      ...(err instanceof FieldError ? { errors: err.fields } : {}),
    })
  }

  if (err.message === 'User not found') {
    return res
      .status(400)
      .json({
        error_key: ErrorKeys.User_not_found,
        message: 'User not found',
        ...(err instanceof FieldError ? { errors: err.fields } : {}),
      })
  }

  if (err.message === 'Invalid password') {
    return res
      .status(400)
      .json({
        error_key: ErrorKeys.Invalid_password,
        message: 'Invalid password',
        ...(err instanceof FieldError ? { errors: err.fields } : {}),
      })
  }

  if (err.message === 'Invalid token') {
    return res
      .status(400)
      .json({
        error_key: ErrorKeys.Invalid_token,
        message: 'Invalid token',
        ...(err instanceof FieldError ? { errors: err.fields } : {}),
      })
  }

  if (err.message.includes('Missing fields')) {
    return res
      .status(400)
      .json({
        error_key: ErrorKeys.Missing_fields,
        message: err.message,
        ...(err instanceof FieldError ? { errors: err.fields } : {}),
      })
  }

  if (err.message === 'Invalid fields') {
    return res
      .status(400)
      .json({
        error_key: ErrorKeys.Invalid_fields,
        message: 'Invalid fields',
        ...(err instanceof FieldError ? { errors: err.fields } : {}),
      })
  }

  if (err.message === 'Invalid credentials') {
    return res.status(400).json({
      error_key: ErrorKeys.Invalid_credentials,
      message: 'Invalid credentials',
      ...(err instanceof FieldError ? { errors: err.fields } : {}),
    })
  }

  if (err.message === 'Unauthorized') {
    return res
      .status(401)
      .json({
        error_key: ErrorKeys.Unauthorized,
        message: 'Unauthorized',
        ...(err instanceof FieldError ? { errors: err.fields } : {}),
      })
  }

  next(err)
}
