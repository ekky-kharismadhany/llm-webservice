import { Inject, Injectable } from "@nestjs/common";
import { IDocumentRepository } from "./documents.interface";
import { Pool } from "pg";
import { Document } from "./documents.type";

const selectDocuments = "SELECT * FROM documents";

@Injectable()
export class DocumentRepository implements IDocumentRepository {
    constructor(@Inject('DATABASE_POOL') private pool: Pool) { }
    async GetDocuments(): Promise<Document[]> {
        const client = await this.pool.connect();
        try {
            const queryResult = await client.query(selectDocuments);
            const rows: Document[] = queryResult.rows
            return rows;
        }
        catch (e) {
            throw new Error(e)
        } finally {
            client.release()
        }
    }
}