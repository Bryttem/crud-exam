import { Module } from '@nestjs/common';
import { FilterMangaService } from './manga.service';
import { FilterMangaController } from './manga.controller';

@Module({
  controllers: [FilterMangaController],
  providers: [FilterMangaService],
})
export class FilterMangaModule {}
