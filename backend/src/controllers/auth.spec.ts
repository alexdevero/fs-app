import request from 'supertest'

import { DI, app, init } from '..'

describe('Auth Controller', () => {
  beforeAll(async () => {
    await init
  })

  afterAll(async () => {
    await DI.server.close()
    await DI.orm.close()
  })

  describe('POST /api/login', () => {
    it('should return 200 and a token', async () => {
      const res = await request(app).post('/api/login').send({
        email: '',
      })

      expect(res.status).toBe(200)
    })

    it('should return 401', async () => {
      const res = await request(app).post('/api/login').send({
        email: '',
      })

      expect(res.status).toBe(401)
    })
  })

  describe('POST /api/logout', () => {
    it('should return 200', async () => {
      const res = await request(app).post('/api/logout')
    })
  })
})
