import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MangaImage } from './manga-image.entity';

@Entity()
export class Manga {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'string' })
  genere: string;

  @Column({ type: 'string' })
  author: string;

  @Column({ type: 'numeric' })
  pages: number;

  @Column({ type: 'numeric'})
  price: number;

  //Relacion de uno a muchos
  //Un manga puede tener muchas usuarios
  @OneToMany(() => MangaImage, (mangaImage) => mangaImage.manga, {
    cascade: true,
    eager: true,
  })
  images?: MangaImage[];
}
