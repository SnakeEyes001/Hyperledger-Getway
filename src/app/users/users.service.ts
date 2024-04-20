import { Injectable } from '@nestjs/common';
import { createUserProfile } from './dto/user-dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, getRepository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { HashService } from '../hash/hash.service';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userProfileRepo: Repository<UserEntity>,
    private hashService: HashService,
 ) {}

  /* private readonly users = [
    {
      username: 'labo',
      orgname: 'Org1',
      email: 'labo@gmail.com',
    },
    {
      username: 'centre',
      orgname: 'Org2',
      email: 'imran@gmail.com',
    },
  ]; */

/*   async findOne(email: string): Promise<User | undefined> {
    return this.userProfileRepo.find((user:createUserProfile) => user.email === email);
  } */
  
  generateRandomId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&*';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      randomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return randomId;
  }
  async createUserProfile(userProfile:createUserProfile) {
    try {
      const hash = await this.hashService.generateHash(userProfile.email,userProfile.password);
      const user = new UserEntity();
      user.userHash=hash;
      user.firstName=userProfile?.firstName;
      user.lastName=userProfile?.lastName;
      user.adress=userProfile?.adress;
      user.email=userProfile?.email;
      user.phone=userProfile?.phone;
      user.password=userProfile?.password;
      user.firstOwner=userProfile?.firstOwner;
      const result = await this.userProfileRepo.save(user);
      console.log('res',result);
      return result;
    } catch (error) {
      console.log('error :', error);
    }
  }

  async getAllUsers() {
    try {
      const result = await this.userProfileRepo.find();
      console.log('res',result);
      return result;
    } catch (error) {
      console.log('error :', error);
    }
  }

  async login(email:string, passowrd:string){
    try {
      
      //const userHash = await this.hashService.generateHash(email,passowrd);
      const user = await this.userProfileRepo.findOne({ where: { email }});
      if(user){
        return true;
      }
      else{
        return false;
      }
      //const isMatch = await this.hashService.compareHash(userHash);
     //return isMatch;
    } catch (error) {
      console.log('error :', error);
    }
  }
}
