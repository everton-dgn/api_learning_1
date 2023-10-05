import { randomUUID } from 'node:crypto'
import type { UUID } from 'node:crypto'

export type VideoModel = {
  description: string
  duration: number
  title: string
}

export type VideoEntity = VideoModel & {
  id: string
}

export class VideoAggregate {
  constructor(
    private readonly data: VideoModel,
    private readonly id: UUID
  ) {}

  static create(video: VideoModel): VideoAggregate {
    const id = randomUUID()
    return new VideoAggregate(video, id)
  }
}
