import { Schema } from 'mongoose';

export const LocationSchema = new Schema({
  latitude: Number,
  longitude: Number
})


export interface Location {
  latitude: number,
  longitude: number
}