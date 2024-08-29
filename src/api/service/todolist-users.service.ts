import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/data/entity/user.entity";
import { RegisterRequest } from "src/model/request/register-request.dto";
import { ResponseVo } from "src/shared/common/base/response-vo";
import { BeanUtils } from "src/shared/common/bean/bean-utils";
import { ResponseHeader } from "src/shared/common/bean/response-header";
import { ResponseType } from "src/shared/common/constant/type/response-type";
import { Repository } from "typeorm";

@Injectable()
export class ToDoListService {
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
          const userEntity = new UserEntity();
          userEntity.username = registerRequest.username;
        //   userEntity.passwordHash(await bcrypt.hash(registerRequest.getPassword(), 10));
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
}
