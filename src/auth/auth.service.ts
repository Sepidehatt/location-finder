import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from './../users/user.model';
import { ExistingUserDTO } from '../users/dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from '../users/dtos/registeredUser.dto';




@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) { }
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  async register(user: Readonly<User>): Promise<RegisterUserDTO> {
    const { name, email, password } = user;

    const existingUser = await this.userService.findByEmail(email)

    if (existingUser) throw new HttpException('This email already exists', HttpStatus.CONFLICT);

    const hashedPass = await this.hashPassword(password);
    const newUser = await this.userService.createUser(name, email, hashedPass)

    return newUser;
  }

  async doesPassMatch(password: string, hashedPass: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPass)
  }

  async ValidateUser(email: string, password: string): Promise<{ name: string, email: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.UNAUTHORIZED
      );

    const doesPassMatch = await this.doesPassMatch(password, user.password);
    if (!doesPassMatch)
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED
      );
    return { name: user.name, email: user.email }
  }

  async login(existingUser: ExistingUserDTO): Promise<{ token: string }> {
    const { email, password } = existingUser;
    const user = await this.ValidateUser(email, password)
    if (!user)
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED
      );
    const jwt = await this.jwtService.sign({ user })
    return { token: jwt }
  }

}
