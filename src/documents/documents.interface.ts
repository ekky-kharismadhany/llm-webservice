import {
  CreateDocumentRequest,
  DeleteDocumentRequest,
  Document,
} from './documents.type';

export interface IDocumentRepository {
  getDocuments(): Promise<Document[]>;
  createDocument(request: CreateDocumentRequest): Promise<string>;
  deleteDocumet(request: DeleteDocumentRequest): Promise<void>;
}
