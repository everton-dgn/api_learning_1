import type { UUID } from 'node:crypto'
import Fastify from 'fastify'
import 'dotenv/config'
import type { Video } from 'database-postgress'
import { DatabasePostgres } from 'database-postgress'

const logger = JSON.parse(process.env.LOGGER_ENABLED || 'false')
const app = Fastify({ logger })

app.post('/videos', async (req, reply) => {
  const { title, description, duration } = req.body as Video
  await DatabasePostgres.create({
    title,
    description,
    duration
  })
  return reply.status(201).send()
})

app.get('/videos', async req => {
  const { search } = req.query as { search: string }
  return DatabasePostgres.list(search)
})

app.put('/videos/:id', async (req, reply) => {
  const { id } = req.params as { id: UUID }
  const { title, description, duration } = req.body as Video
  await DatabasePostgres.update(id, {
    title,
    description,
    duration
  })
  return reply.status(204).send()
})

app.delete('/videos/:id', async (req, reply) => {
  const { id } = req.params as { id: UUID }
  await DatabasePostgres.delete(id)
  return reply.status(204).send()
})

export default app
