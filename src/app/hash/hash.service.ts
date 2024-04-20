import { Injectable } from '@nestjs/common';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/utils/Constants';
@Injectable()
export class HashService {
  async generateHash(email:string, pass:string) {
    //const saltOrRounds = 10;
    const salt = await bcrypt.genSalt();
    const password = email+':'+pass;
    const hash = await bcrypt.hash(password, salt);    
    return hash;
  }


  async compareHash(hash:string, ) {
    const isMatch = await bcrypt.compare(hashPassword, hash);
    if(isMatch){
      return true;
    }else{
      return false ;
    }
  }
}
