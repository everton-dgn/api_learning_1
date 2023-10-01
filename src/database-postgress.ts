import type { UUID } from 'node:crypto'
import { randomUUID } from 'node:crypto'
import sql from './db'

export type Video = {
  description: string
  duration: number
  title: string
}

export class DatabasePostgres {
  static async list(search = '') {
    return sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`
  }

  static async create(video: Video) {
    const videoId = randomUUID()
    await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${video.title}, ${video.description}, ${video.duration})`
  }

  static async update(id: UUID, video: Video) {
    const { title, description, duration } = video
    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
  }

  static async delete(id: UUID) {
    await sql`DELETE FROM videos WHERE id = ${id}`
  }
}
