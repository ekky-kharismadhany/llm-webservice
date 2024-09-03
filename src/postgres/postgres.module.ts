import { Global, Module } from "@nestjs/common";
import { Pool } from "pg";
import { Pgvector } from "./pgvector/pgvector.service";
import { DataSource } from "typeorm";

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
    {
      provide: "TYPEORM_ADAPTER",
      useValue: new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "user",
        password: "password",
        database: "llm_vector_db",
      }),
    },
  ],
  exports: ["DATABASE_POOL", Pgvector, "TYPEORM_ADAPTER"],
})
export class PostgresModule {}
