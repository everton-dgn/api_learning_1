import type { UUID } from 'node:crypto'
import { randomUUID } from 'node:crypto'

export type VideoModel = {
  description: string
  duration: number
  title: string
}

export type VideoEntity = VideoModel & {
  id: UUID
}

export class VideoAggregate {
  constructor(private readonly data: VideoEntity) {}

  static create(video: VideoModel): VideoAggregate {
    const id = randomUUID()
    const videoWithId: VideoEntity = { ...video, id }
    return new VideoAggregate(videoWithId)
  }

  get id(): string {
    return this.data.id
  }

  get title(): string {
    return this.data.title
  }

  get description(): string {
    return this.data.description
  }

  get duration(): number {
    return this.data.duration
  }
}
