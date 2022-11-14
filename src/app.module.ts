import { Module } from '@nestjs/common';
import { CoffeesModule } from './coffees/coffees.module';
import { RootModule } from './root/root.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    CoffeesModule,
    RootModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
