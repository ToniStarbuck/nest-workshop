import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async getAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      take: limit, 
      skip: offset
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: +id }, relations: ['flavors'] });
    if (!coffee) throw new NotFoundException(`Coffe with id=${id} not found`);
    return coffee;
  }

  async createOne(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavors = await Promise.all(createCoffeeDto.flavors.map(flavor =>  this.preloadFlavorByName(flavor)));
    const newCoffee = this.coffeeRepository.create({...createCoffeeDto, flavors});
    return this.coffeeRepository.save(newCoffee);
  }

  async updateOne(id: string, coffee: UpdateCoffeeDto) {
    const flavors = coffee.flavors && (await Promise.all(coffee.flavors.map(flavor =>  this.preloadFlavorByName(flavor))));

    const toUpdate = await this.coffeeRepository.preload({
      id: +id,
      ...coffee,
      flavors
    });

    if (!toUpdate) throw new NotFoundException(`Coffe with id=${id} not found`);
    
    return this.coffeeRepository.save(toUpdate);
  }

  async removeOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: +id } });    
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor>{
    const flavor = await this.flavorRepository.findOne({where: { name }})
    if (flavor) return flavor;    
    return this.flavorRepository.create({ name });
  }
}
