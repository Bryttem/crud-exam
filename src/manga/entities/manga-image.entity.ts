import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Manga } from './manga.entity';

@Entity()
export class MangaImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  //Relacion de muchos a uno
  //Muchas imagenes pueden ser de un usuario
  @ManyToOne(() =>Manga, (manga) => manga.images, {
    onDelete: 'CASCADE',
  })
  manga: Manga
}
