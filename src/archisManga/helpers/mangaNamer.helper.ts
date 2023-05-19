import { v4 as uuid } from 'uuid';

export const mangaNamer = (req, manga: Express.Multer.File, callback) => {
  if (!manga) return callback(new Error('Archivo vacío'), false);

  const fileExtension = manga.mimetype.split('/')[1];
  
  const mangaName = `${uuid()}.${fileExtension}`;

  callback(null, mangaName);
};

