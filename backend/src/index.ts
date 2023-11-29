import 'reflect-metadata'
import express from 'express'
import http from 'http'
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core'
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { User } from './entities/user'
import { authController, usersController } from './controllers'

export const DI = {} as {
  server: http.Server
  orm: MikroORM
  em: EntityManager
  userRepository: EntityRepository<User>
}

export const app = express()
const PORT = process.env.PORT || 3000

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>()

  DI.em = DI.orm.em
  DI.userRepository = DI.orm.em.getRepository(User)

  app.use(cookieParser())
  app.use(express.json())
  app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next))
  app.use('/api', authController)
  app.use('/api/users', usersController)

  DI.server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})()
