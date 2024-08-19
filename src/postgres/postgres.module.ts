import { Global, Module } from "@nestjs/common";
import { Pool } from "pg";
import { Pgvector } from "./pgvector/pgvector.service";

@Global()
@Module({
  providers: [
    {
      provide: "DATABASE_POOL",
      useValue: new Pool({
        user: "user",
        password: "password",
        database: "llm_vector_db",
        port: 5432,
      }),
    },
    Pgvector,
  ],
  exports: ["DATABASE_POOL", Pgvector],
})
export class PostgresModule {}
