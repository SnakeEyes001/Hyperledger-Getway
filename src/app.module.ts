import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './app/admin/admin.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { InteractionModule } from './app/interaction/interaction.module';
import { UserEntity } from './app/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashModule } from './app/hash/hash.module';
import { AdminOprModule } from './app/admin-opr/admin-opr.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'my_database',
      entities: [UserEntity],
      synchronize: true,
    }),
    AdminModule,
    AdminOprModule,
    AuthModule,
    UsersModule,
    InteractionModule,
    HashModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
