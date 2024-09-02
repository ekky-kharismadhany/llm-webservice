import { Injectable } from '@nestjs/common';
import type { EmbeddingsInterface } from "@langchain/core/embeddings";
import { PGVectorStore, PGVectorStoreArgs } from '@langchain/community/vectorstores/pgvector';
import {PoolConfig } from 'pg';


const postgresConnectionOption: PoolConfig = {
    host: "localhost",
    port: 5432,
    user: "user",
    password: "password",
    database: "llm_vector_db"
}

const config: PGVectorStoreArgs = {
    tableName: "llm_vector_db",
    postgresConnectionOptions: postgresConnectionOption,
    columns: {
        idColumnName: "id",
        vectorColumnName: "vector",
        contentColumnName: "content",
        metadataColumnName: "metadata",
    },
    distanceStrategy: "cosine"
}

@Injectable()
export class PgvectorService {
    async createPgVectorStorage(embedding: EmbeddingsInterface) {
        const pgVectorStorage = await PGVectorStore.initialize(embedding, config)
        return pgVectorStorage
    }
}
