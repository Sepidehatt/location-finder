import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LocationSchema } from "./location.model";
import { LocationsController } from "./locations.controller";
import { LocationsService } from "./locations.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }])],
  controllers: [LocationsController],
  providers: [LocationsService],
})

export class LocationModule { }