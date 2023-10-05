import type { VideoAggregate, VideoModel } from 'domain/models/video-contracts'
import type { UUID } from 'node:crypto'
import type { VideoRepository } from 'domain/repositories/video-repository'

export interface VideoService {
  create: (video: VideoModel) => Promise<VideoAggregate>
  find: (
    criteria: Record<string, string>
  ) => Promise<VideoAggregate | undefined>
  list: () => Promise<VideoAggregate[]>
  remove: (id: UUID) => Promise<boolean>
  update: (video: VideoModel, id: UUID) => Promise<boolean>
}

export abstract class VideoServiceImplementation implements VideoService {
  protected constructor(private readonly repository: VideoRepository) {}

  async create(video: VideoModel): Promise<VideoAggregate> {
    return this.repository.create(video)
  }

  async find(
    criteria: Record<string, string>
  ): Promise<VideoAggregate | undefined> {
    const result = await this.repository.find(criteria)
    if (result.length === 0) throw new Error('Video not found')
    return result.pop()
  }

  async list(): Promise<VideoAggregate[]> {
    return this.repository.find({})
  }

  async remove(id: UUID): Promise<boolean> {
    return this.repository.remove(id)
  }

  async update(video: VideoModel, id: UUID): Promise<boolean> {
    return this.repository.update(id, video)
  }
}
