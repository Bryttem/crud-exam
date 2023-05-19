import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class CreateMangaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    name: string;
  
    @IsString()
    @IsNotEmpty()
    genere: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @IsNotEmpty()
    pages: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    //Relaciones
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
  }
  