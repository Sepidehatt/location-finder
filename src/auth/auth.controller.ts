import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { existingUserDTO } from "./../users/dtos/existing-user.dto";
import { newUserDTO } from "./../users/dtos/new-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Res() res,@Body() user: newUserDTO): Promise<any> {
    const newUser = await this.authService.register(user)
    return res.json(newUser)
  }

  @Post('login')
  @HttpCode(200)
  async login(@Res() res, @Body() user: existingUserDTO): Promise<any> {
    const token = await this.authService.login(user)
    return res.json(token)
  }
}