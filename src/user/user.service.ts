import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UserImage } from './entities/user-image.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserImage)
    private readonly imageRepository: Repository<UserImage>,
    private readonly dataSource: DataSource,
  ) {}

  //Metodo para crear un usuario
  async create(userDto: CreateUserDto) {
    const { images = [], ...detalleUser } = userDto;
    const user = await this.userRepository.create({
      ...detalleUser,
      images: images.map((image) =>
        this.imageRepository.create({ url: image }),
      ),
    });
    await this.userRepository.save(user);
    return user;
  }

  //Metodo para visualizar todos los usuarios
  findAll() {
    return this.userRepository.find({
      relations: ['images'],
    });
  }

  //Metodo para visualizar un usuario especifico
  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  //Remover un usuario especifico
  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return 'Usuario eliminado satisfactoriamente';
  }
  async update(id: string, cambios: CreateUserDto) {
    const { images, ...updateAll } = cambios;
    const user = await this.userRepository.preload({
      id: id,
      ...updateAll,
    });

    //Consultar a la base de datos para modificarla
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    //Si vienen nuevas imagenes, que se eliminen las anteriores
    if (images) {
      await queryRunner.manager.delete(UserImage, { user: { id } });

      //Si vienen nuevas imagenes que las agregue a la tabla de UserImage
      user.images = images.map((image) =>
        this.imageRepository.create({ url: image }),
      );
    } else {
      user.images = await this.imageRepository.findBy({ user: { id } });
    }

    //Salvamos y cerramos la consulta
    await queryRunner.manager.save(user);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return user;
  }
}
