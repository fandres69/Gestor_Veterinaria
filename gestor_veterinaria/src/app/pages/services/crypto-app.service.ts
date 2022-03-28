import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoAppService {

  private secretKey=environment.secretKey;
  constructor() { }

  encrypt(word:string):string{  
    let result=CryptoJs.AES.encrypt(word,this.secretKey).toString();
    console.log(result);    
    return result;

  }

  decrypt(word:string){
    let bites=CryptoJs.AES.decrypt(word,this.secretKey);
    let result=bites.toString(CryptoJs.enc.Utf8);
    console.log(result);
    return result;
  }
}
