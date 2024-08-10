import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDocumentRequest, CreateDocumentResponse, Document } from './documents.type';
import { DocumentsService } from './documents.service';

@Controller('api/documents')
export class DocumentsController {
    constructor(private readonly documentService: DocumentsService) { }
    @Get()
    async getDocuments(): Promise<Document[]> {
        const documents = await this.documentService.getDocuments()
        return documents
    }

    @Post()
    async uploadDocumentWithWebsite(@Body() request: CreateDocumentRequest): Promise<CreateDocumentResponse> {
        if (request.source.length === 0) {
            throw new BadRequestException("url required");
        }
        if (request.sourceType === 0) {
            throw new BadRequestException("source type needed")
        }
        const uuid = await this.documentService.createDocument(request)
        return {
            uuid: uuid
        }
    }
}
