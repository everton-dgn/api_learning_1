import {
  UUIDSchema,
  VideoModelSchema,
  VideoServiceImplementation
} from 'domain/services/video-service'
import { VideoRepository } from 'domain/repositories/video-repository'
import { VideoAggregate } from 'domain/models/video-contracts'
import type { VideoModel } from 'domain/models/video-contracts'
import type { UUID } from 'node:crypto'
import { randomUUID } from 'node:crypto'

// TODO: como saber se o resultado não vem erroneamente apenas um item?
// TODO: a logica do stub pode fazer teste passar mesmo mudando uma validação

const errorMessageVideo = 'Invalid video'
const errorMessageId = 'Invalid id'

export class VideoRepositoryStub extends VideoRepository {
  async create(video: VideoModel): Promise<VideoAggregate> {
    const id = 'dummy_id' as UUID
    return new VideoAggregate({ id, ...video })
  }

  async find(criteria: Record<string, string>): Promise<VideoAggregate[]> {
    if (criteria.search === 'non_existent') {
      return []
    }
    const video = new VideoAggregate({
      id: 'dummy_id' as UUID,
      description: 'dummy_description',
      duration: 180,
      title: 'dummy_title'
    })
    return [video]
  }

  async remove(id: UUID): Promise<boolean> {
    if (id === ('known_id' as UUID)) {
      return Promise.resolve(true)
    }
    return Promise.resolve(false)
  }

  async update(video: VideoModel, id: UUID): Promise<boolean> {
    const idValidationResult = UUIDSchema.safeParse(id)
    if (!idValidationResult.success) {
      throw new Error(errorMessageId)
    }

    const videoValidationResult = VideoModelSchema.safeParse(video)
    if (!videoValidationResult.success) {
      throw new Error(errorMessageVideo)
    }

    return Promise.resolve(true)
  }
}

describe('VideoServiceImplementation', () => {
  it('should create a video', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const video: VideoModel = {
      title: 'dummy_title',
      description: 'dummy_description',
      duration: 180
    }
    const result = await sut.create(video)
    expect(result).toBeInstanceOf(VideoAggregate)
    expect(result.id).toBeTruthy()
    expect(result.title).toBe(video.title)
    expect(result.description).toBe(video.description)
    expect(result.duration).toBe(video.duration)
  })

  it('should find a video to search', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const criteria: Record<string, string> = { search: 'dummy_search' }
    const result = await sut.find(criteria)
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(VideoAggregate)
  })

  it('should return error when no video is found', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const criteria: Record<'search', string> = { search: 'non_existent' }
    const result = sut.find(criteria)
    await expect(result).rejects.toThrow('Video not found!')
  })

  it('should find videos', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const criteria: Record<string, string> = { search: '' }
    const result = await sut.find(criteria)
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(VideoAggregate)
  })

  it('should remove a video when find id', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const result = await sut.remove('dummy_id' as UUID)
    expect(result).toBe(false)
  })

  it('should not remove a video when not find id', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const result = await sut.remove('known_id' as UUID)
    expect(result).toBe(true)
  })

  it('should update a video by the id', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const video: VideoModel = {
      title: 'dummy_title',
      description: 'dummy_description',
      duration: 180
    }
    const id: UUID = randomUUID()
    const result = await sut.update(video, id)
    expect(result).toBe(true)
  })

  it('should not update a video when an id is invalid', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const video: VideoModel = {
      title: 'dummy_title',
      description: 'dummy_description',
      duration: 180
    }
    const result = sut.update(video, 'invalid_id' as UUID)
    await expect(result).rejects.toThrow(errorMessageId)
  })

  it('should not update a video when a video is invalid', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const video: VideoModel = {
      title: 'dummy_title',
      description: 'dummy_description',
      duration: -10
    }
    const id: UUID = randomUUID()
    const result = sut.update(video, id)
    await expect(result).rejects.toThrow(errorMessageVideo)
  })

  it('should not update a video when your data does not exist', async () => {
    const repository = new VideoRepositoryStub()
    const sut = new VideoServiceImplementation(repository)
    const video: VideoModel = {
      title: '',
      description: '',
      duration: 0
    }
    const id: UUID = randomUUID()
    const result = sut.update(video, id)
    await expect(result).rejects.toThrow(errorMessageVideo)
  })
})
