import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserImage } from './user-image.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'string' })
  lastName: string;

  @Column({ type: 'string' })
  product: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'string'})
  direction: string;

  //Relacion de uno a muchos
  //Un usuario puede tener muchas pedidos
  @OneToMany(() => UserImage, (userImage) => userImage.user, {
    cascade: true,
    eager: true,
  })
  images?: UserImage[];
}
