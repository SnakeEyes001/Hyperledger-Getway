import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HashService } from './hash.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('hash')
export class HashController {
  constructor(private readonly hashService: HashService) {}

  @Get('/hash')
  @ApiParam({ name: 'email', required: true, type: 'string' })
  @ApiParam({ name: 'password', required: true, type: 'string' })
  generateHash(@Param('email') email,@Param('password') password) {
    return this.hashService.generateHash(email,password);
  }

  @Get('/isMatch/:hash')
  @ApiParam({ name: 'hash', required: true, type: 'string' })
  issMatch(@Param('hash') hash) {
    return this.hashService.compareHash(hash);
  }
}
