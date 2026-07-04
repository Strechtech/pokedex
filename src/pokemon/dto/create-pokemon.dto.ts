import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  no!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;
}