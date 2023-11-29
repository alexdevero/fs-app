export type BaseUserReq = {
  email: string
  password: string
}

export type AuthUserReq = BaseUserReq & {
  id: string
}

export type UserReq = BaseUserReq & {
  name: string
}
