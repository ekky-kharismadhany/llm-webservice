import { ChatOllama } from "@langchain/ollama";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Readable } from "stream";
import {
  GenerativeCompleteResponse,
  GenerativeResponse,
} from "./generative.type";
import { DataSource } from "typeorm";
import { answerPromptTemplate, fewShotPrompTempate, fewShotSqlExample } from "./generative.constant";
import { SqlDatabase } from "langchain/sql_db";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { QuerySqlTool } from "langchain/tools/sql";

@Injectable()
export class GenerativeRepository {
  private logger = new Logger(GenerativeRepository.name);
  constructor(
    @Inject("OLLAMA_CHAT_ADAPTER") private chatAdapter: ChatOllama,
    @Inject("TYPEORM_ADAPTER") private datasource: DataSource,
  ) {}

  async generateChat(question: string) {
    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: this.datasource,
    });
    const sqlPrompt = await this.createSqlPrompt(db, question);
    const sqlChain = await this.createSqlChain(sqlPrompt, db, question)
    const answerChainWithSql = this.createAnswerWithSqlChain(db, sqlChain)
    const response = await answerChainWithSql.stream({question: question});
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

  private async createSqlPrompt(db: SqlDatabase ,question: string) {
    const tableInfo = await db.getTableInfo(["places", "place_types"]);
    this.logger.log(tableInfo)
    const prompt = PromptTemplate.fromTemplate(
      `Input pengguna: {input} \n kueri: {query}`,
    );
    const fewShotPrompt = new FewShotPromptTemplate({
      examples: fewShotSqlExample,
      examplePrompt: prompt,
      prefix: fewShotPrompTempate,
      suffix: "Input pengguna: {input} \n kueri: ",
      inputVariables: ["input", "top_k", "table_info"],
    });
    await fewShotPrompt.format({
      input: question,
      top_k: 3,
      table_info: tableInfo,
    });
    return fewShotPrompt
  }

  private async createSqlChain(prompt: FewShotPromptTemplate, db: SqlDatabase, question: string) {
    const chain = await createSqlQueryChain({
      db: db,
      dialect: "postgres",
      llm: this.chatAdapter,
      prompt: prompt
    });
    const result = await chain.invoke({
      question: question
    })
    return result;
  }

  private createAnswerWithSqlChain(db: SqlDatabase, sqlQuery: string) {
    const answerPrompt = PromptTemplate.fromTemplate(answerPromptTemplate);
    const answerChain =   answerPrompt.pipe(this.chatAdapter).pipe(new StringOutputParser());
    const runnableChain = RunnableSequence.from([
      RunnablePassthrough.assign({
        result: () => {
          try {            
            this.logger.log(sqlQuery);
            const r = new QuerySqlTool(db).invoke(sqlQuery)
            r.then(res => this.logger.log(res))
            return r;
          } catch(e: unknown) {
            this.logger.error(e)
            return ""
          }
        }
      }), answerChain
    ]);
    return runnableChain;
  }
}
