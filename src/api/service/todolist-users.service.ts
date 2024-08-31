import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/data/entity/user.entity";
import { RegisterRequest } from "src/model/request/register-request.dto";
import { ResponseVo } from "src/shared/common/base/response-vo";
import { BeanUtils } from "src/shared/common/bean/bean-utils";
import { ResponseHeader } from "src/shared/common/bean/response-header";
import { ResponseType } from "src/shared/common/constant/type/response-type";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ToDoListUsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(registerRequest: RegisterRequest): Promise<ResponseVo<UserEntity>> {
    try {
        if (BeanUtils.isNotEmpty(registerRequest.username)) {
            const userDuplicate = await this.userRepository.findOne({ where: { username: registerRequest.username }});
            if (BeanUtils.isNotEmpty(userDuplicate)) {
                const responseVo = new ResponseVo<UserEntity>(userDuplicate);
                responseVo.setHeader(new ResponseHeader('500', 'USERNAME_DUPLICATE'));
                return responseVo;
            } else {
                // if (!this.isPasswordValid(registerRequest.password)) {
                //     const responseVo = new ResponseVo<UserEntity>();
                //     responseVo.setHeader(new ResponseHeader('400', 'INVALID_PASSWORD_FORMAT'));
                //     return responseVo;
                // }

                const userEntity = new UserEntity();
                userEntity.username = registerRequest.username;
              
                const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
                userEntity.passwordHash = hashedPassword;

                userEntity.firstName = registerRequest.firstName;
                userEntity.lastName = registerRequest.lastName;

                await this.userRepository.save(userEntity);

                const responseVo = new ResponseVo<UserEntity>(userEntity);
                responseVo.setHeader(new ResponseHeader('200', ResponseType.CD2000));
                return responseVo;
            }
        }
    } catch (error) {
        console.error('CrudUserService.createUser Exception: ', error);
        const responseVo = new ResponseVo<UserEntity>();
        responseVo.setHeader(new ResponseHeader('500', 'CONTACT_ADMIN'));
        throw new InternalServerErrorException(responseVo);
    }
}

  async findByUsername(username: string): Promise<ResponseVo<UserEntity>> {
    try {
      const user = await this.userRepository.findOne({ where: {username }});
      const responseVo = new ResponseVo<UserEntity | undefined>(user);
      if(user) {
        responseVo.setHeader(new ResponseHeader('200', ResponseType.CD2000));
      } else {
        responseVo.setHeader(new ResponseHeader('404', 'USER_NOT_FOUND'));
      }
      return responseVo;
    } catch (error) {
      console.error('ToDoListService.findByUsername Exception:', error);
      const responsevo = new ResponseVo<UserEntity | undefined>(null);
      responsevo.setHeader(new ResponseHeader('500','CONTACT_ADMIN' ));
      throw new InternalServerErrorException(responsevo); 
    }
  }

  private isPasswordValid(password: string): boolean {
    if(password.length < 8) {
      return false;
    }
    return true;
  }
}
