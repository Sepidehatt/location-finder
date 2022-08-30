import { Controller, Post,Body, UseGuards } from "@nestjs/common";
import { JwtGuard } from "./../auth/guards/jwt.guards";
import { LocationsService } from "./locations.service";


@Controller('create-location')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) { }

  // @UseGuards(JwtGuard)
  @Post()
  async addProduct(
    @Body('latitude') lat: number,
    @Body('langitude') lang: number
  ) {
    const generatedId = await this.locationService.createLocation(lat,lang);
    return { id: generatedId }
  }

}