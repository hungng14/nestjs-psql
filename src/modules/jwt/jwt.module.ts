import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('secret'),
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JWTModule {}
