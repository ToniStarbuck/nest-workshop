import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from './coffees/coffees.module';
import { RootModule } from './root/root.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    RootModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
