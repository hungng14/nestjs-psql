import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}