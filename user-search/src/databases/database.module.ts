import { DatabaseService } from './database.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
