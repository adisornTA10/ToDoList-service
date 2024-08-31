import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/service/auth.service";
import { LocalAuthGuard } from "src/auth/guard/local-auth.guard";
import { LoginRequest } from "src/model/request/login-request.dto";
import { RegisterRequest } from "src/model/request/register-request.dto";
import { UserEntity } from "src/data/entity/user.entity";
import { ResponseVo } from "src/shared/common/base/response-vo";
import { ToDoListUsersService } from "./service/todolist-users.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

@Controller('users')
export class ToDoListUsersController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: ToDoListUsersService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginRequest: LoginRequest): Promise<ResponseVo<{ access_token: string }>> {
      return this.authService.login(loginRequest);
    }
    
    @Post('register')
    async register(@Body() registerRequest: RegisterRequest): Promise<ResponseVo<UserEntity>> {
      return this.userService.createUser(registerRequest);
    }
}