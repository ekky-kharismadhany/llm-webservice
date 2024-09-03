import { Global, Module, Provider } from "@nestjs/common";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { ChatOllama } from "@langchain/ollama";
import { PgvectorService } from "./pgvector/pgvector.service";

const ollamaEmbeddingAdapter: Provider = {
  provide: "OLLAMA_EMBEDDING_ADAPTER",
  useValue: new OllamaEmbeddings({
    baseUrl: "http://localhost:11434",
    model: "all-minilm",
  }),
};

const ollamaChatAdapter: Provider = {
  provide: "OLLAMA_CHAT_ADAPTER",
  useValue: new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "mistral",
  }),
};

@Global()
@Module({
  providers: [ollamaEmbeddingAdapter, ollamaChatAdapter, PgvectorService],
  exports: ["OLLAMA_EMBEDDING_ADAPTER", "OLLAMA_CHAT_ADAPTER"],
})
export class LangchainModule {}
