import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { GenerativeService } from "./generative.service";
import { GenerativeRequest } from "./generative.type";

@Controller("api/generative")
export class GenerativeController {
  constructor(private generativeService: GenerativeService) {}
  @Post()
  async generateChat(@Body() request: GenerativeRequest, @Res() res: Response) {
    if (request.prompt.length === 0) {
      throw new BadRequestException("prompt must exist");
    }
    const stream = await this.generativeService.generateChatStream(
      request.prompt,
    );
    res.set({
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    });

    stream.pipe(res);
  }
}
