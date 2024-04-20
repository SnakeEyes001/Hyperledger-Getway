import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable prettier/prettier */
export class createUserProfile {

    @ApiProperty()
    userHash: string;

    @ApiProperty()
    firstName: string;
  
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    adress: string;

    @ApiProperty()
    phone: string;
  
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    password: string;

    @ApiProperty()
    firstOwner:boolean;
}