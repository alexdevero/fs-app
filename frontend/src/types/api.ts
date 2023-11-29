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
  users: User[]
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
