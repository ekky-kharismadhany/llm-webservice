import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
    providers: [
        {
            provide: "DATABASE_POOL",
            useValue: new Pool({
                user: "user",
                password: "password",
                database: "llm_vector_db",
                port: 5432
            }),
        }
    ],
    exports: ["DATABASE_POOL"]
})
export class PostgresModule { }
