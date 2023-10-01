import request from 'tests/setup.js'

describe('Testando as rotas', () => {
  it('Deve responder com "Hello World!" em /', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Hello World!')
  })

  it('Deve responder com "abc" em /abc', async () => {
    const response = await request.get('/abc')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('abc')
  })
})
