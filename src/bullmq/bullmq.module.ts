import { BullModule } from '@nestjs/bullmq';
import { Logger, Module, OnModuleInit } from '@nestjs/common';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
        password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
      },
    }),
    BullModule.registerQueue({
      name: 'EMBEDDING_QUEUE',
    }),
  ],
  exports: [BullModule],
})
export class BullmqModule implements OnModuleInit {
  private logger = new Logger(BullmqModule.name);
  onModuleInit() {
    this.logger.log('bull mq is initialized');
  }
}
