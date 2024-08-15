import { Global, Module, Provider } from '@nestjs/common';
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

const ollamaEmbeddingAdapter: Provider = {
    provide: "OLLAMA_EMBEDDING_ADAPTER",
    useValue: new OllamaEmbeddings(
        {
            baseUrl: "http://localhost:11434",
            model: "all-minilm",
        }
    )
}

@Global()
@Module({
    providers: [ollamaEmbeddingAdapter],
    exports: ["OLLAMA_EMBEDDING_ADAPTER"]
})
export class LangchainModule { }
