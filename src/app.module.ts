import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsController } from './documents/documents.controller';
import { PostgresModule } from './postgres/postgres.module';
import { DocumentsService } from './documents/documents.service';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [PostgresModule, DocumentsModule],
  controllers: [AppController, DocumentsController],
  providers: [AppService, DocumentsService],
})
export class AppModule {}
