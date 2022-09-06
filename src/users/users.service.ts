import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './dtos/registeredUser.dto';
import { User } from './user.model';


@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec()
  }

  async createUser(name: string, email: string, hashedPass: string): Promise<RegisterUserDTO> {
    const newUser = await this.userModel.create({ name, email, password: hashedPass })
    return { id: String(newUser._id), name: newUser.name, email: newUser.email }
  }
}
