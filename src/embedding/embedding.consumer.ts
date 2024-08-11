import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

@Processor("EMBEDDING_QUEUE")
export class EmbeddingConsumer extends WorkerHost {
    private logger = new Logger(EmbeddingConsumer.name);
    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.verbose(`job with name ${job.name} is working`)
        return {};
    }
}