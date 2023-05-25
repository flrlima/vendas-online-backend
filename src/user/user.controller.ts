// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      userEntity => new ReturnUserDto(userEntity)
    );
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }
}
