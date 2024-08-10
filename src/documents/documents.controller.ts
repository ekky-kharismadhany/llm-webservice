import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDocumentRequest } from './documents.type';
import { DocumentsService } from './documents.service';

@Controller('api/documents')
export class DocumentsController {
    constructor(private readonly documentService: DocumentsService) { }
    @Get()
    async getDocuments() {
        const documents = await this.documentService.getDocuments()
        return documents
    }

    @Post('/website')
    uploadDocumentWithWebsite(@Body() request: CreateDocumentRequest): string {
        if (request.source.length === 0) {
            throw new BadRequestException("url required");
        }
        if (request.sourceType === 0) {
            throw new BadRequestException("source type needed")
        }
        return `this is your documents ${request.source}\n`;
    }
}
