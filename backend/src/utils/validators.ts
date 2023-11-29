import type { Request } from 'express'
import { matchedData, validationResult } from 'express-validator'

export function validateFields<T>(req: Request, fields: string[]) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new Error('Validation failed')
  }

  const data = matchedData(req)
  const missingFields = fields.filter((field) => data[field] === undefined)
  if (missingFields.length > 0) {
    throw new Error(`Missing fields: ${missingFields.join(', ')}`)
  }

  return data as T
}
