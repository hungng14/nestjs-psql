import { IsEAN, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}