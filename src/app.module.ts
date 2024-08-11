import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsController } from './documents/documents.controller';
import { PostgresModule } from './postgres/postgres.module';
import { DocumentsService } from './documents/documents.service';
import { DocumentsModule } from './documents/documents.module';
import { EmbeddingModule } from './embedding/embedding.module';
import { BullmqModule } from './bullmq/bullmq.module';

@Module({
  imports: [PostgresModule, DocumentsModule, EmbeddingModule, BullmqModule],
  controllers: [AppController, DocumentsController],
  providers: [AppService, DocumentsService],
})
export class AppModule { }
