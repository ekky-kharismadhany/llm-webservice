import { Injectable, Logger } from '@nestjs/common';
import { EmbeddingRepository } from './embedding.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EmbeddingResponse } from './embedding.type';

@Injectable()
export class EmbeddingService {
  constructor(
    private embeddingRepository: EmbeddingRepository,
    @InjectQueue('EMBEDDING_QUEUE') private embeddingQueue: Queue,
  ) {}

  private logger = new Logger(EmbeddingService.name);

  async startEmbeddingProcess(documentId: string): Promise<EmbeddingResponse> {
    try {
      this.logger.verbose('start embedding process');
      const document =
        await this.embeddingRepository.getDocumentById(documentId);
      const job = await this.embeddingQueue.add('embedding', document, {
        removeOnComplete: true,
      });
      this.logger.verbose(job.name);
      return {
        document: document,
        message: 'embedding process has started',
      };
    } catch (e) {
      throw e;
    }
  }
}
