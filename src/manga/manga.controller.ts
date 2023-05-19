import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/manga.dto';

@Controller('mangas')
export class MangaController {
  constructor(private readonly userServiceRepo: MangaService) {}

  //Metodo para crear un manga
  @Post()
  create(@Body() mangaDto: CreateMangaDto) {
    return this.userServiceRepo.create(mangaDto);
  }

  //Metodo para mostrar todos los mangas
  @Get()
  findAll() {
    return this.userServiceRepo.findAll();
  }

  //Metodo para mostrar un manga especifico
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userServiceRepo.findOne(id);
  }

  //Eliminar un manga especifico
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userServiceRepo.remove(id);
  }

  //Crear método patch, para actualizar
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: CreateMangaDto,
  ) {
    return this.userServiceRepo.update(id, updateUserDto);
  }
}
