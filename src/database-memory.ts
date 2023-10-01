import { randomUUID } from 'node:crypto'

export type Video = {
  description: string
  duration: number
  title: string
}

export class DatabaseMemory {
  #videos = new Map()

  list(search?: string) {
    return Array.from(this.#videos.entries())
      .map(videoArray => {
        const id = videoArray[0]
        const video = videoArray[1]
        return { id, ...video }
      })
      .filter(video => {
        if (!search) return true
        return video.title.includes(search)
      })
  }

  create(video: Video) {
    const id = randomUUID()

    this.#videos.set(id, video)
  }

  update(id: number, video: Video) {
    this.#videos.set(id, video)
  }

  delete(id: number) {
    this.#videos.delete(id)
  }
}
