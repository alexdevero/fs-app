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
