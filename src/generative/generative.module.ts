import { Module } from "@nestjs/common";
import { GenerativeController } from "./generative.controller";
import { GenerativeService } from "./generative.service";
import { GenerativeRepository } from "./generative.repository";

@Module({
  controllers: [GenerativeController],
  providers: [GenerativeService, GenerativeRepository],
})
export class GenerativeModule {}
