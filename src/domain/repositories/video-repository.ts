import type { VideoAggregate, VideoModel } from 'domain/models/video-contracts'
import type { UUID } from 'node:crypto'

export interface FindVideoRepository {
  find: (criteria: Record<string, string>) => Promise<VideoAggregate[]>
}

export interface CreateVideoRepository {
  create: (video: VideoModel) => Promise<VideoAggregate>
}

export interface UpdateVideoRepository {
  update: (id: UUID, video: VideoModel) => Promise<boolean>
}

export interface RemoveVideoRepository {
  remove: (id: UUID) => Promise<boolean>
}

export abstract class VideoRepository
  implements
    FindVideoRepository,
    CreateVideoRepository,
    UpdateVideoRepository,
    RemoveVideoRepository
{
  abstract create(video: VideoModel): Promise<VideoAggregate>

  abstract find(criteria: Record<string, string>): Promise<VideoAggregate[]>

  abstract remove(id: UUID): Promise<boolean>

  abstract update(id: UUID, video: VideoModel): Promise<boolean>
}
