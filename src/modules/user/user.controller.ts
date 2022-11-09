import { Body, Controller, Post } from '@nestjs/common';
import { CreateDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('create')
  create(@Body() dto: CreateDto) {
    return this.userService.create(dto)
  }
}
