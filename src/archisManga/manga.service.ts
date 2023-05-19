import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilterMangaService {
  staticMangaImage(imageName: string) {
    //Acceder a la ruta completa donde se encuentra la imagen
    const path = join(__dirname, '../../static/mangas', imageName);

    if (!existsSync(path)) {
      throw new BadRequestException(
        `No se encuentra el manga con la imagen ${imageName}`,
      );
    }

    return path;
  }
}
