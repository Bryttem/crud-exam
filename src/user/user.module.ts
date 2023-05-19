import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { UserImage } from './entities/user-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserImage])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
