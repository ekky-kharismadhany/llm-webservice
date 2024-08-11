import { Module } from '@nestjs/common';
import { EmbeddingController } from './embedding.controller';
import { EmbeddingService } from './embedding.service';
import { EmbeddingRepository } from './embedding.repository';
import { BullmqModule } from 'src/bullmq/bullmq.module';
import { EmbeddingConsumer } from './embedding.consumer';

@Module({
  imports: [BullmqModule],
  controllers: [EmbeddingController],
  providers: [EmbeddingService, EmbeddingRepository, EmbeddingConsumer],
})
export class EmbeddingModule { }
