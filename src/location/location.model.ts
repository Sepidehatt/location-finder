import { Schema } from 'mongoose';

export const LocationSchema = new Schema({
  latitude: Number,
  langitude: Number
})


export interface Location {
  latitude: number,
  langitude: number
}