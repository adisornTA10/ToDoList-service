import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ProfileEntity } from "src/data/entity/profile.entity";
import { TopicEntity } from "src/data/entity/topic.entity";
import { UserEntity } from "src/data/entity/user.entity";
import { TodoEntity } from "src/data/entity/todo.entity";

export const appConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '43.229.79.65',
  port: 3003,
  username: 'learningq',
  password: 'learningq@2024',
  database: 'q_example',
  entities: [UserEntity, ProfileEntity, TopicEntity, TodoEntity],
  synchronize: true,
  logging: true,
};
