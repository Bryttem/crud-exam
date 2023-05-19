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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userServiceRepo: UserService) {}

  //Metodo para crear un usuario
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userServiceRepo.create(userDto);
  }

  //Metodo para mostrar todos los usuarios
  @Get()
  findAll() {
    return this.userServiceRepo.findAll();
  }

  //Metodo para mostrar un usuario especifico
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userServiceRepo.findOne(id);
  }

  //Eliminar un usuario especifico
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userServiceRepo.remove(id);
  }

  //Crear método patch, para actualizar
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return this.userServiceRepo.update(id, updateUserDto);
  }
}
