import { Injectable } from "@nestjs/common";
import { DocumentRepository } from "./documents.repository";
import {
  CreateDocumentRequest,
  DeleteDocumentRequest,
  Document,
} from "./documents.type";

@Injectable()
export class DocumentsService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async getDocuments(): Promise<Document[]> {
    try {
      return this.documentRepository.getDocuments();
    } catch (e: unknown) {
      throw e;
    }
  }

  async createDocument(request: CreateDocumentRequest): Promise<string> {
    try {
      return this.documentRepository.createDocument(request);
    } catch (e: unknown) {
      throw e;
    }
  }

  async deleteDocument(request: DeleteDocumentRequest): Promise<void> {
    try {
      return this.documentRepository.deleteDocumet(request);
    } catch (e: unknown) {
      throw e;
    }
  }
}
