import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  //Relacion de muchos a uno
  //Muchos usuarios pueden ser de un pedido
  @ManyToOne(() => User, (user) => user.images, {
    onDelete: 'CASCADE',
  })
  user: User;
}
