import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/locations.module';

@Module({
  imports: [LocationModule, MongooseModule.forRoot(
    "mongodb+srv://sepidehatt:sepidehatt@cluster0.g9coksr.mongodb.net/nestjs-project?retryWrites=true&w=majority",
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
