export type LoginResponse = {
  message: string
  token: string
}

export type LogoutResponse = {}

export type RegisterResponse = {
  message: string
  user: User
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

export type DeleteUserResponse = {
  message: string
}

export type UpdateUserResponse = {
  message: string
  user: User
}

export type GetUsersResponse = {
  users: Omit<User, 'password'>[]
}

export type GetUserResponse = {
  user: User
}

export type CreateUserResponse = {
  message: string
  user: User
}

export type GetMeResponse = {
  user: User
}

export type ErrorResponse = {
  error_key: ErrorKeys
  message: string
}

export enum ErrorKeys {
  Invalid_credentials = 'invalid_credentials',
  Invalid_fields = 'invalid_fields',
  Invalid_password = 'invalid_password',
  Invalid_token = 'invalid_token',
  Missing_fields = 'invalid_credentials',
  Unauthorized = 'unauthorized',
  User_already_exists = 'user_already_exists',
  User_not_found = 'user_not_found',
  Validation_failed = 'validation_failed',
}

type Fields = Record<string, string>

export class FieldError extends Error {
  fields: Fields

  constructor(message: string, fields: Fields) {
    super(message)
    this.name = 'FieldError'
    this.fields = fields
  }
}
