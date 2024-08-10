import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { DocumentsService } from './documents.service';
import { DocumentRepository } from './documents.repository';
import { DocumentsController } from './documents.controller';

@Module({
    controllers: [DocumentsController],
    providers: [DocumentsService, DocumentRepository, PostgresModule],
    exports: [DocumentRepository]
})
export class DocumentsModule { }
