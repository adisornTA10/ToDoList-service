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
import { ProfileEntity } from "src/data/entity/profile.entity";

@Injectable()
export class ToDoListUsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async userSavePost(registerRequest: RegisterRequest): Promise<ResponseVo<UserEntity>> {
    try {
        if (BeanUtils.isNotEmpty(registerRequest.username)) {
            const userDuplicate = await this.userRepository.findOne({ where: {  username: registerRequest.username }});
            if (BeanUtils.isNotEmpty(userDuplicate)) {
                const responseVo = new ResponseVo<UserEntity>();
                responseVo.setData(userDuplicate);
                responseVo.setHeader(new ResponseHeader('500', 'USERNAME_DUPLICATE'));
                return responseVo;
            } else {
                //Set User Entity
                const userEntity = new UserEntity();
                userEntity.setUsername(registerRequest.username);
                userEntity.setPasswordHash(await bcrypt.hash(registerRequest.password, 10));
                userEntity.setActive(1);
                //Set Profile Entity
                const profileEntity = new ProfileEntity();
                profileEntity.setFirstName(registerRequest.firstName);
                profileEntity.setLastName(registerRequest.lastName);
                profileEntity.setAge(registerRequest.age);
                profileEntity.setGender(registerRequest.gender);
                profileEntity.setActive(1);
                await this.profileRepository.save(profileEntity);

                userEntity.setProfileEntity(profileEntity);
                await this.userRepository.save(userEntity);

                const responseVo = new ResponseVo<UserEntity>();
                responseVo.setData(userEntity);
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
      const responseVo = new ResponseVo<UserEntity | undefined>();
      responseVo.setData(user);
      if(user) {
        responseVo.setHeader(new ResponseHeader('200', ResponseType.CD2000));
      } else {
        responseVo.setHeader(new ResponseHeader('404', 'USER_NOT_FOUND'));
      }
      return responseVo;
    } catch (error) {
      console.error('ToDoListService.findByUsername Exception:', error);
      const responsevo = new ResponseVo<UserEntity | undefined>();
      responsevo.setData(null);
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
