import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilterMangaService } from './manga.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { mangaFilter } from './helpers/mangaFilter.helper';
import { diskStorage } from 'multer';
import { mangaNamer } from './helpers/mangaNamer.helper';
import { Response } from 'express';

@Controller('images')
export class FilterMangaController {
  constructor(private readonly mangaService: FilterMangaService) {}

  @Get('manga/:mangaImageName')
  findProduct(@Res() res: Response, @Param('mangaImageName') mangaImageName: string) {
    const path = this.mangaService.staticMangaImage(mangaImageName);

    res.sendFile(path);
  }

  @Post('manga')
  @UseInterceptors(
    FileInterceptor('archis', {
      fileFilter: mangaFilter,
      //El storage es para definir donde guardar el archivo
      storage: diskStorage({
        destination: './static/mangas',
        filename: mangaNamer,
      }),
    }),
  )
  uploadMangaImage(@UploadedFile() manga: Express.Multer.File) {
    //Si no viene una imagen que nos mande el siguiente mensaje
    if (!manga) {
      throw new BadRequestException('Asegurese que el archivo es una imagen');
    }

    const getUrl = `${manga.filename}`;

    return getUrl;
  }
}