import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/data/entity/user.entity";

export const appConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '43.229.79.65',
  port: 3003,
  username: 'learningq',
  password: 'learningq@2024',
  database: 'q_example',
  entities: [UserEntity],
  synchronize: true,
  logging: true
};
