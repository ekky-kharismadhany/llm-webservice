import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentRepository } from './documents.repository';
import { DocumentsController } from './documents.controller';

@Module({
    controllers: [DocumentsController],
    providers: [DocumentsService, DocumentRepository],
    exports: [DocumentRepository]
})
export class DocumentsModule { }
