import { Injectable } from "@nestjs/common";
import { Readable } from "stream";
import { GenerativeRepository } from "./generative.repository";

@Injectable()
export class GenerativeService {
  constructor(private repo: GenerativeRepository) {}
  async generateChatStream(question: string): Promise<Readable> {
    const readableStream = await this.repo.generateChat(question);
    return readableStream;
  }
}
