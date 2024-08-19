import { Test, TestingModule } from "@nestjs/testing";
import { GenerativeController } from "./generative.controller";

describe("GenerativeController", () => {
  let controller: GenerativeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerativeController],
    }).compile();

    controller = module.get<GenerativeController>(GenerativeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
