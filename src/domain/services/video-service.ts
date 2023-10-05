import type { VideoAggregate, VideoModel } from 'domain/models/video-contracts'
import type { UUID } from 'node:crypto'
import type { VideoRepository } from 'domain/repositories/video-repository'
import z from 'zod'

export const UUIDSchema = z.string().uuid()
export const VideoModelSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number().positive()
})

export interface VideoService {
  create: (video: VideoModel) => Promise<VideoAggregate>
  find: (criteria: Record<string, string>) => Promise<VideoAggregate[]>
  list: () => Promise<VideoAggregate[]>
  remove: (id: UUID) => Promise<boolean>
  update: (video: VideoModel, id: UUID) => Promise<boolean>
}

export class VideoServiceImplementation implements VideoService {
  constructor(private readonly repository: VideoRepository) {}

  async create(video: VideoModel): Promise<VideoAggregate> {
    return this.repository.create(video)
  }

  async find(criteria: Record<string, string>): Promise<VideoAggregate[]> {
    const result = await this.repository.find(criteria)
    if (!result.length) throw new Error('Video not found!')
    return result
  }

  async list(): Promise<VideoAggregate[]> {
    return this.repository.find({ search: '' })
  }

  async remove(id: UUID): Promise<boolean> {
    return this.repository.remove(id)
  }

  async update(video: VideoModel, id: UUID): Promise<boolean> {
    const idValidationResult = UUIDSchema.safeParse(id)
    if (!idValidationResult.success) {
      throw new Error('Invalid id')
    }

    const videoValidationResult = VideoModelSchema.safeParse(video)
    if (!videoValidationResult.success) {
      throw new Error('Invalid video')
    }

    return this.repository.update(video, id)
  }
}
