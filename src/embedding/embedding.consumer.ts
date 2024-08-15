import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject, Logger } from "@nestjs/common";
import { Job } from "bullmq";
import type { EmbeddingsInterface } from "@langchain/core/embeddings";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { v4 as uuidv4 } from "uuid";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { Pgvector } from "src/postgres/pgvector/pgvector.service";

type DocumentPromise = Promise<Document<Record<string, any>>[][]>

@Processor("EMBEDDING_QUEUE")
export class EmbeddingConsumer extends WorkerHost {
    constructor(
        @Inject("OLLAMA_EMBEDDING_ADAPTER") private embedding: EmbeddingsInterface,
        private pgVector: Pgvector
    ) {
        super();
    }
    private logger = new Logger(EmbeddingConsumer.name, { timestamp: true });
    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.verbose(`job with name ${job.name} is working`);
        const document = await this.loadDocumentFromSources([job.data.source]);
        const pgVector = await this.pgVector.createPgVectorStorage(this.embedding)
        await this.insertDocumentToPgVector(document, pgVector)
        return {};
    }

    async loadDocument(source: string) {
        const filteredSplit: Document<Record<string, any>>[] = [];
        try {
            this.logger.verbose(`source: ${source}`)
            const loader = new CheerioWebBaseLoader(source);
            const docs = await loader.load();
            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 500,
                chunkOverlap: 0,
            });
            const allSplits = await textSplitter.splitDocuments(docs);
            allSplits.map(split => {
                if (!split.pageContent.includes("function")) {
                    filteredSplit.push(split)
                }
            })
            return filteredSplit;
        } catch (e) {
            this.logger.error(e)
            throw e
        } finally {
            return filteredSplit;
        }
    }

    async loadDocumentFromSources(websiteSource: string[]): DocumentPromise {
        const documentPromises = websiteSource.map(source => this.loadDocument(source))
        const document = await Promise.all(documentPromises)
        return document
    }

    async insertDocumentToPgVector(documents: Document<Record<string, any>>[][], PgVector: PGVectorStore) {
        try {
            const ids: string[] = []
            const documentList: Document[] = []
            documents.map((document) => documentList.push(...document))
            documentList.map(() => ids.push(uuidv4()))
            await PgVector.addDocuments(documentList, { ids: ids });
            await PgVector.end()
        } catch (error) {
            this.logger.error("Error inserting vector: ", error);
        }
        this.logger.verbose("insert vector complete")
    }
}
