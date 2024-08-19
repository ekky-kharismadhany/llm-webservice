import { Controller, Get, Param } from "@nestjs/common";
import { EmbeddingService } from "./embedding.service";

@Controller("api/embedding")
export class EmbeddingController {
  constructor(private embeddingService: EmbeddingService) {}
  @Get(":documentId")
  async startEmbeddingProcessByUuid(@Param("documentId") documentId: string) {
    return this.embeddingService.startEmbeddingProcess(documentId);
  }
}
