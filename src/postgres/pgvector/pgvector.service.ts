import { Injectable } from '@nestjs/common';
import type { EmbeddingsInterface } from "@langchain/core/embeddings";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

@Injectable()
export class Pgvector {
    async createPgVectorStorage(embeddings: EmbeddingsInterface) {
        const pgVectorStorage = await PGVectorStore.initialize(embeddings, {
            tableName: "vector_tables",
            postgresConnectionOptions: {
                host: "localhost",
                port: 5432,
                user: "user",
                password: "password",
                database: "llm_vector_db"
            },
            columns: {
                idColumnName: "id",
                vectorColumnName: "vector",
                contentColumnName: "content",
                metadataColumnName: "metadata",
            },
            distanceStrategy: "cosine",
        });
        return pgVectorStorage
    }
}
