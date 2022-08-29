import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';


@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }



  async findByEmail(email:string): Promise<User | null>{
    return this.userModel.findOne({email}).exec()
  }

  async findById(id:string): Promise<User | null>{
    const user = await this.userModel.findById(id).exec()
    if (!user) return null
    return user
  
  }

  async createUser(name:string, email:string, hashedPass:string):Promise<any>{
    const newUser = await this.userModel.create({name,email,password:hashedPass})
    return {id:newUser._id, name: newUser.name, email:newUser.email}
  }
}