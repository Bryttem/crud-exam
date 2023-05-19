import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from './entities/manga.entity';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { MangaImage } from './entities/manga-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manga, MangaImage])],
  controllers: [MangaController],
  providers: [MangaService],
})
export class MangaModule {}
