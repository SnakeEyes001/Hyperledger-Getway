import { Module } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { InteractionController } from './interaction.controller';
import { AdminService } from '../admin/admin.service';

@Module({
  controllers: [InteractionController],
  providers: [InteractionService,AdminService]
})
export class InteractionModule {}
