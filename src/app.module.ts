import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './data/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { ToDoListUsersController } from './api/todolist-users.controller';
import { ToDoListUsersService } from './api/service/todolist-users.service';
import { ProfileEntity } from './data/entity/profile.entity';
import { TodoEntity } from './data/entity/todo.entity';
import { TopicEntity } from './data/entity/topic.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(appConfig),
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, TodoEntity, TopicEntity]),
    AuthModule,
  ],
  controllers: [AppController, ToDoListUsersController],
  providers: [
    ToDoListUsersService, 
    AppService
  ],
})
export class AppModule {}
