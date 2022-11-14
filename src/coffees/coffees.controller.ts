import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, page } = paginationQuery;
    return this.coffeesService.getAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const foundCoffee = this.coffeesService.findOne(id);
    if (foundCoffee) return foundCoffee;
    return { message: 'not found' };
  }

  @Post()
  createOne(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.createOne(createCoffeeDto);
  }

  @Patch(':id')
  patchOne(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.updateOne(id, updateCoffeeDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.coffeesService.removeOne(id);
  }
}
