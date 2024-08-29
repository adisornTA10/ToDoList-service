import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './data/user.repository';
import { UserEntity } from './data/entity/user.entity';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(appConfig),
    TypeOrmModule.forFeature([UserEntity,UserRepository]),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy, LocalAuthGuard],
})
export class AppModule {}
