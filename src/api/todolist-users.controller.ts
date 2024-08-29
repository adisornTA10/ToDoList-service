import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/guard/local-auth.guard";
import { LoginRequest } from "src/model/request/login-request.dto";
import { RegisterRequest } from "src/model/request/register-request.dto";
import { ToDoListService } from "./service/todolist-users.service";

@Controller('users')
export class ToDoListController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: ToDoListService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginRequest: LoginRequest) {
      return this.authService.login(loginRequest);
    }
  
    @Post('register')
    async register(@Body() registerRequest: RegisterRequest) {
      return this.userService.createUser(registerRequest);
    }
}