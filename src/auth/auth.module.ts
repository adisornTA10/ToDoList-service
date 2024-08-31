import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/entity/user.entity';
import { ToDoListUsersService } from 'src/api/service/todolist-users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') || '60m' },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService, 
    ToDoListUsersService, 
    JwtStrategy, 
    LocalStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}
