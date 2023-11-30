import { ErrorKeys } from './error-keys'

export type ErrorResponse = {
  error_key: ErrorKeys
  message: string
}
