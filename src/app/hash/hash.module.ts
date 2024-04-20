import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { HashController } from './hash.controller';

@Module({
  controllers: [HashController],
  providers: [HashService]
})
export class HashModule {}
