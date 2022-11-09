import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDto } from './dto';
import * as argon2 from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: await argon2.hash(data.password)
        },
      });
      delete user.password;
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Email existed')
        }
      }
      throw new Error(error.message || error)
    }

  }
}
