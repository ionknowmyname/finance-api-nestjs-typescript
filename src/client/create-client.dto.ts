/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";


export class CreateClientDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phonenumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
