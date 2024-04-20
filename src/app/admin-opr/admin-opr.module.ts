import { Module } from '@nestjs/common';
import { AdminOprService } from './admin-opr.service';
import { AdminOprController } from './admin-opr.controller';

@Module({
  controllers: [AdminOprController],
  providers: [AdminOprService]
})
export class AdminOprModule {}
