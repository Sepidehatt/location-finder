import { Controller, Post, Body } from "@nestjs/common";
import { Location } from "./location.model";
import { LocationsService } from "./locations.service";


@Controller('create-location')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) { }

  @Post()
  async addProduct(@Body() location: Location): Promise<{ id: string }> {
    const generatedId = await this.locationService.createLocation(location);
    return { id: generatedId }
  }

}