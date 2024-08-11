import { Test, TestingModule } from '@nestjs/testing';
import { EmbeddingRepository } from './embedding.repository';

describe('Embedding', () => {
  let provider: EmbeddingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmbeddingRepository],
    }).compile();

    provider = module.get<EmbeddingRepository>(EmbeddingRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
