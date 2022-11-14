import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async getAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: +id } });
    if (!coffee) {
      throw new NotFoundException(`Coffe with id=${id} not found`);
    }
    return coffee;
  }

  createOne(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const newCoffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(newCoffee);
  }

  async updateOne(id: string, coffee: UpdateCoffeeDto) {
    const toUpdate = await this.coffeeRepository.preload({
      id: +id,
      ...coffee,
    });

    if (!toUpdate) throw new NotFoundException(`Coffe with id=${id} not found`);
    
    return this.coffeeRepository.save(toUpdate);
  }

  async removeOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: +id } });    
    return this.coffeeRepository.remove(coffee);
  }
}
