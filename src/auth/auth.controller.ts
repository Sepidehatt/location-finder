import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { User } from "src/users/user.model";
import { ExistingUserDTO } from "./../users/dtos/existing-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Res() res, @Body() user: User): Promise<any> {
    const newUser = await this.authService.register(user)
    return res.json(newUser)
  }

  @Post('login')
  @HttpCode(200)
  async login(@Res() res, @Body() user: ExistingUserDTO): Promise<any> {
    const token = await this.authService.login(user)
    return res.json(token)
  }
}