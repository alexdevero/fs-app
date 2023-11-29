import type { Request, Response } from 'express'

export function handleError(err: Error, req: Request, res: Response, next: Function) {
  if (err.message === 'Validation failed') {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  if (err.message === 'User already exists') {
    return res.status(400).json({ message: 'User already exists' })
  }

  if (err.message === 'User not found') {
    return res.status(400).json({ message: 'User not found' })
  }

  if (err.message === 'Invalid password') {
    return res.status(400).json({ message: 'Invalid password' })
  }

  if (err.message === 'Invalid token') {
    return res.status(400).json({ message: 'Invalid token' })
  }

  if (err.message.includes('Missing fields')) {
    return res.status(400).json({ message: err.message })
  }

  if (err.message === 'Invalid fields') {
    return res.status(400).json({ message: 'Invalid fields' })
  }

  if (err.message === 'Invalid credentials') {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  if (err.message === 'Unauthorized') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next(err)
}
