import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './data/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { ToDoListUsersService } from './api/service/todolist-users.service';
import { ToDoListUsersController } from './api/todolist-users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(appConfig),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
  ],
  controllers: [AppController, ToDoListUsersController],
  providers: [
    ToDoListUsersService, 
    AppService
  ],
})
export class AppModule {}
