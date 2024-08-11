import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { Document } from './embedding.type';

const selectDocumentByUuid = "SELECT * FROM documents WHERE uuid = $1 LIMIT 1";

@Injectable()
export class EmbeddingRepository {
    constructor(
        @Inject('DATABASE_POOL') private pool: Pool
    ) { }

    async getDocumentById(document: string): Promise<Document> {
        const client = await this.pool.connect();
        try {
            const queryResult = await client.query(selectDocumentByUuid, [document])
            if (queryResult.rows.length === 0) {
                throw new NotFoundException("no document found")
            }
            return queryResult.rows[0] as Document
        } catch (e) {
            throw new Error(e);
        } finally {
            client.release();
        }
    }
}
