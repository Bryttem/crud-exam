import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Manga } from './entities/manga.entity';
import { CreateMangaDto } from './dto/manga.dto';
import { MangaImage } from './entities/manga-image.entity';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
    @InjectRepository(MangaImage)
    private readonly imageRepository: Repository<MangaImage>,
    private readonly dataSource: DataSource,
  ) {}

  //Metodo para crear un manga
  async create(mangaDto: CreateMangaDto) {
    const { images = [], ...detalleManga } = mangaDto;
    const manga = await this.mangaRepository.create({
      ...detalleManga,
      images: images.map((image) =>
        this.imageRepository.create({ url: image }),
      ),
    });
    await this.mangaRepository.save(manga);
    return manga;
  }

  //Metodo para visualizar todos los mangas
  findAll() {
    return this.mangaRepository.find({
      relations: ['images'],
    });
  }

  //Metodo para visualizar un mangaespecifico
  findOne(id: string) {
    return this.mangaRepository.findOneBy({ id });
  }

  //Remover un manga especifico
  async remove(id: string) {
    const manga = await this.findOne(id);
    await this.mangaRepository.remove(manga);
    return 'Usuario eliminado satisfactoriamente';
  }
  async update(id: string, cambios: CreateMangaDto) {
    const { images, ...updateAll } = cambios;
    const manga = await this.mangaRepository.preload({
      id: id,
      ...updateAll,
    });

    //Consultar a la base de datos para modificarla
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    //Si vienen nuevas imagenes, que se eliminen las anteriores
    if (images) {
      await queryRunner.manager.delete(MangaImage, { manga: { id } });

      //Si vienen nuevas imagenes que las agregue a la tabla de MangaImage
      manga.images = images.map((image) =>
        this.imageRepository.create({ url: image }),
      );
    } else {
      manga.images = await this.imageRepository.findBy({ manga: { id } });
    }

    //Salvamos y cerramos la consulta
    await queryRunner.manager.save(manga);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return manga;
  }
}
