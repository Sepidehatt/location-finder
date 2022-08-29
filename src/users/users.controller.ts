import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller()
export class UserController {
  constructor(private uerService: UsersService) { }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.uerService.findById(id);
  }
}