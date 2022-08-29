import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { existingUserDTO } from "./../users/dtos/existing-user.dto";
import { newUserDTO } from "./../users/dtos/new-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(@Body() user: newUserDTO): Promise<any> {
    return this.authService.register(user)
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() user: existingUserDTO): Promise<any> {
    return this.authService.login(user)
  }
}