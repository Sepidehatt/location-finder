import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name : String,
  email:{
    type: String,
    unique:true,
    required:true
  },
  password: {
    type: String,
    required:true
  }
})


export interface User {
  name : string,
  email:string,
  password: string
}