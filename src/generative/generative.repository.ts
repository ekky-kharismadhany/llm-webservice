import { ChatOllama } from "@langchain/ollama";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Pgvector } from "src/postgres/pgvector/pgvector.service";
import type { EmbeddingsInterface } from "@langchain/core/embeddings";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Readable } from "stream";
import {
  GenerativeCompleteResponse,
  GenerativeResponse,
} from "./generative.type";

@Injectable()
export class GenerativeRepository {
  private logger = new Logger(GenerativeRepository.name);
  constructor(
    private pgVectorService: Pgvector,
    @Inject("OLLAMA_CHAT_ADAPTER") private chatAdapter: ChatOllama,
    @Inject("OLLAMA_EMBEDDING_ADAPTER")
    private embeddingAdapter: EmbeddingsInterface,
  ) {}

  async generateChat(question: string) {
    const pgvector = await this.pgVectorService.createPgVectorStorage(
      this.embeddingAdapter,
    );
    const docs = await pgvector.similaritySearch(question);
    this.logger.verbose(`found ${docs.length} to support large language model`);
    const chain = await this.createChain(question);
    const response = await chain.stream({
      context: docs,
    });
    return new Readable({
      async read() {
        try {
          const { value, done } = await response.next();
          if (done) {
            this.push(
              JSON.stringify({
                created_at: new Date().toUTCString(),
                done: true,
                done_reason: "stop",
                eval_count: 0, // You might want to track this differently
              } as GenerativeCompleteResponse),
            );
            this.push(null);
          } else {
            this.push(
              JSON.stringify({
                created_at: new Date().toUTCString(),
                done: false,
                message: {
                  content: value,
                  role: "assistant",
                },
                model: "mistral",
              } as GenerativeResponse),
            );
          }
        } catch (error) {
          this.destroy(error);
        }
      },
    });
  }

  private createPrompt(question: string) {
    return PromptTemplate.fromTemplate(`${question}: {context}`);
  }

  private createChain(question: string) {
    return createStuffDocumentsChain({
      llm: this.chatAdapter,
      prompt: this.createPrompt(question),
      outputParser: new StringOutputParser(),
    });
  }

  private createResponse(val: string): GenerativeResponse {
    const date = new Date();
    return {
      created_at: date.toUTCString(),
      done: false,
      message: {
        content: val,
        role: "assistant",
      },
      model: "mistral",
    };
  }
}
