import request from 'tests/setup.js'

describe('Testando as rotas', () => {
  it('Deve retornar uma lista de vídeos nas chamadas GET para rota /videos', async () => {
    const response = await request.get('/videos')
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(7)
  })

  it('should list videos', async () => {
    const response = await request.get('/videos').query({ search: 'Test' })
    expect(response.status).to.equal(200)
    expect(response.body.length).toBe(3)
  })

  it.skip('should create a new video', async () => {
    const response = await request.post('/videos').send({
      title: 'Test Video',
      description: 'Test Description',
      duration: 120
    })
    expect(response.status).toBe(201)
  })

  it.skip('should update a video', async () => {
    const response = await request.put('/videos/1').send({
      title: 'Updated Video',
      description: 'Updated Description',
      duration: 130
    })
    expect(response.status).toBe(204)
  })

  it.skip('should delete a video', async () => {
    const response = await request.delete('/videos/1')
    expect(response.status).toBe(204)
  })
})
