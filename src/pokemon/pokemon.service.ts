import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/PaginatioDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {

    this.defaultLimit = this.configService.get<number>('defaultLimit') ?? 10;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException('Cant create Pokemon - Check server logs');
    }
  }

  findAll(PaginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = PaginationDto;
    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      no: 1
    })
    .select('-__v')
    ;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    // 1️⃣ Verificar si es MongoDB ObjectId
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
      if (pokemon) return pokemon;
    }

    // 2️⃣ Buscar por número (no)
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
      if (pokemon) return pokemon;
    }

    // 3️⃣ Buscar por nombre
    pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    if (pokemon) return pokemon;

    // Si no encontró nada
    throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }
      
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      }
      throw error;
    }
  }

  async remove(term: string) {
    const pokemon = await this.findOne(term);
    await this.pokemonModel.findByIdAndDelete(pokemon._id);
    return { message: `Pokemon "${pokemon.name}" deleted successfully` };
  }
}