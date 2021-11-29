import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
const generate_password = require('password-generator')
const encrypt_password = require('crypto-js')

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(/* Add @inject to inject parameters */) {

  }

  /*
   * Add service methods here
   */
GeneratePasswordFunction(){
    let password = generate_password(6,false);
    return password;
}
EncryptPasswordFunction(password:string){
  let password_encrypt = encrypt_password.MD5(password).toString();
  return password_encrypt;
}
}
