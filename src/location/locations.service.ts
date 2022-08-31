import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Location } from "./location.model";

@Injectable()

export class LocationsService {
  constructor(@InjectModel('Location') private readonly locationModel: Model<Location>) { }

  async createLocation(latitude: number, langitude: number) {
    const newLocation = await this.locationModel.create({ latitude, langitude });
    return newLocation.id;
  };

}