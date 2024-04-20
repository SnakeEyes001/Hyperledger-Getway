import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiParam } from '@nestjs/swagger';
import {createUserProfile} from './dto/user-dto';
//import { get } from 'http';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/newUser')
  async createNewProfile(
    @Body() createUserProfile:createUserProfile,
  ) {
 try {
  console.log('data',createUserProfile)
      const res = await this.usersService.createUserProfile(createUserProfile);
      return res;
    } catch (error) {
      console.log('error :', error);
    }
  }

  
  @Get('/allUsers')
  //@ApiParam({ name: 'email', required: true, type: 'string' })
  async getUsers() {
    try {
      const res = await this.usersService.getAllUsers();
      return res;
    } catch (error) {
      console.log('error :', error);
    }
  }

  @Get('/login/:email/:password')
  @ApiParam({ name: 'email', required: true, type: 'string' })
  @ApiParam({ name: 'password', required: true, type: 'string' })
  async login(
    @Param('email') email,
    @Param('password') password,
  ) {
    try {
      const res = await this.usersService.login(email,password);
      return res;
    } catch (error) {
      console.log('error :', error);
    }
  }
}
