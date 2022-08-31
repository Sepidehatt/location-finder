import { Controller, Post, Body } from "@nestjs/common";
import { LocationsService } from "./locations.service";


@Controller('create-location')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) { }

  @Post()
  async addProduct(
    @Body('latitude') lat: number,
    @Body('langitude') lang: number
  ) {
    const generatedId = await this.locationService.createLocation(lat, lang);
    return { id: generatedId }
  }

}