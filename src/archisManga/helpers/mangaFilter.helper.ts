export const mangaFilter = (req, manga: Express.Multer.File, callback) => {
  if (!manga) {
    return callback(new Error('Archivo vacío'), false);
  }

  const fileExtension = manga.mimetype.split('/')[1];
  const validExtension = ['jpeg', 'jpg', 'png'];

  if (validExtension.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(null, false);
};
