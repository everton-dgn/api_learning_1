import supertest from 'supertest'
import app from 'main/app.js'

beforeAll(async () => {
  await app.listen({ port: 5000 })
})

afterAll(async () => {
  await app.close()
})

const request = supertest(app.server)

export default request
