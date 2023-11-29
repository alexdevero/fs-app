import bcrypt from 'bcryptjs'
import { v4 as Uuid } from 'uuid'

import { DI } from '..'
import { User } from './../entities/user'

export async function getUsers() {
  const users = await DI.userRepository.findAll()

  return users
}

export async function getUserByEmail(email: string) {
  const user = await DI.em.findOne(User, { email })

  return user
}

export async function getUserById(id: string) {
  const user = await DI.em.findOne(User, { id })

  return user
}

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = DI.em.create(User, {
    id: Uuid(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  await DI.em.persistAndFlush(user)

  return user
}

export async function updateUser(
  id: string,
  name: string,
  email: string,
  password: string,
) {
  const user = await DI.em.findOneOrFail(User, { id })

  const hashedPassword = await bcrypt.hash(password, 10)

  user.name = name
  user.email = email
  user.password = hashedPassword
  user.updatedAt = new Date()

  await DI.em.persistAndFlush(user)

  return user
}

export function deleteUser(id: string) {
  return DI.em.nativeDelete(User, { id })
}
