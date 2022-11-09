import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async login(email: string, password: string) {
    try {
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new NotFoundException('User or password incorrect');
      }
      const verifiedPassword = await argon2.verify(user.password, password);
      if (!verifiedPassword) {
        throw new NotFoundException('User or password incorrect');
      }
      const payload = {
        email,
        sub: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '20m' });
      return {
        email,
        accessToken,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signUp(data: SignUpDto) {
    try {
      const newUser = {
        ...data,
        password: await argon2.hash(data.password),
      };

      const user = await this.prisma.user.create({ data: newUser });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email has registered already');
        }
      }
      throw new BadRequestException(error);
    }
  }

  async verifyToken(token: string) {
    try {
      const rs = this.jwtService.verify(token);
      return rs;
    } catch (error) {}
  }
}
