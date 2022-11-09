import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwt: JwtService
  ) { }
  use(req: Request, res: Response, next: NextFunction) {
    console.log('request..')
    const { headers } = req;
    const authorization = headers['authorization'] || headers['Authorization'] as string;
    if (!authorization) {
      throw new UnauthorizedException()
    }
    const token = (authorization.split('Bearer')[1] || '').trim()
    if (!token) {
      throw new UnauthorizedException()
    }
    const user = this.jwt.verify(token)
    req['user'] = user
    next();
  }
}
