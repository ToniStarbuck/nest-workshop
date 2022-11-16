import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
