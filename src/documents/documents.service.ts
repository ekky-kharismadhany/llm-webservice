import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './documents.repository';
import { CreateDocumentRequest, Document } from './documents.type';

@Injectable()
export class DocumentsService {
    constructor(private readonly documentRepository: DocumentRepository) { }

    async getDocuments(): Promise<Document[]> {
        try {
            return this.documentRepository.GetDocuments();
        } catch (e: unknown) {
            throw e
        }
    }

    async createDocument(request: CreateDocumentRequest): Promise<string> {
        try {
            return this.documentRepository.CreateDocument(request);
        } catch (e: unknown) {
            throw e;
        }
    }
}
