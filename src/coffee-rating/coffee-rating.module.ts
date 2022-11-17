import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeesService } from 'src/coffees/coffees.service';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [DatabaseModule.register({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'pass123',
    port: 5432
  }), CoffeesModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
