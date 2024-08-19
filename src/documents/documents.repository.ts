import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IDocumentRepository } from "./documents.interface";
import { Pool } from "pg";
import {
  CreateDocumentRequest,
  DeleteDocumentRequest,
  Document,
} from "./documents.type";
import { randomUUID } from "crypto";

const selectDocuments = "SELECT * FROM documents";
const createDocument =
  "INSERT INTO documents (uuid, source_type_id, source) VALUES ($1, $2, $3)";
const deleteDocument = "DELETE FROM documents WHERE uuid = $1";

@Injectable()
export class DocumentRepository implements IDocumentRepository {
  constructor(@Inject("DATABASE_POOL") private pool: Pool) {}

  async getDocuments(): Promise<Document[]> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(selectDocuments);
      const rows: Document[] = queryResult.rows;
      return rows;
    } catch (e) {
      throw new Error(e);
    } finally {
      client.release();
    }
  }

  async createDocument(request: CreateDocumentRequest): Promise<string> {
    const client = await this.pool.connect();
    try {
      const uuid = randomUUID();
      const values = [uuid, request.sourceType, request.source];
      await client.query(createDocument, values);
      return uuid;
    } catch (e) {
      if (
        e instanceof Error &&
        e.message.includes("duplicate key value violates unique constraint")
      ) {
        throw new ConflictException(
          `document from ${request.source} is already on database`,
        );
      }
      throw new Error(e);
    } finally {
      client.release();
    }
  }

  async deleteDocumet(request: DeleteDocumentRequest) {
    const client = await this.pool.connect();
    try {
      await client.query(deleteDocument, [request.uuid]);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error("query error");
    }
  }
}
