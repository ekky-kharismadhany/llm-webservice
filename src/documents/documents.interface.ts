import { Document } from "./documents.type";

export interface IDocumentRepository {
    GetDocuments(): Promise<Document[]>
    // CreateDocument(request: CreateDocumentRequest): Promise<string>
}