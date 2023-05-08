/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";


export class CreateClientDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phonenumber: string;

  @IsString()
  password: string;
}
