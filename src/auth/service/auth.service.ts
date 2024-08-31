import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ToDoListUsersService } from 'src/api/service/todolist-users.service';
import { UserEntity } from 'src/data/entity/user.entity';
import { ResponseVo } from 'src/shared/common/base/response-vo';
import { ResponseHeader } from 'src/shared/common/bean/response-header';
import { ResponseType } from 'src/shared/common/constant/type/response-type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: ToDoListUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const responseVo = await this.userService.findByUsername(username);
      const user: UserEntity | undefined = responseVo.getData();
      
      if (user && await bcrypt.compare(pass, user.passwordHash)) { 
        const { passwordHash, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('AuthService.validateUser Exception: ', error);
      throw new InternalServerErrorException('Failed to validate user');
    }
  }


  async login(user: any): Promise<ResponseVo<{ access_token: string }>> {
    try {
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      const responseVo = new ResponseVo<{ access_token: string }>({ access_token: accessToken });
      responseVo.setHeader(new ResponseHeader('200', ResponseType.CD2000));
      return responseVo;
    } catch (error) {
      console.error('AuthService.login Exception: ', error);
      const responseVo = new ResponseVo<{ access_token: string }>();
      responseVo.setHeader(new ResponseHeader('500', error.message));
      throw new InternalServerErrorException(responseVo);
    }
  }
}
