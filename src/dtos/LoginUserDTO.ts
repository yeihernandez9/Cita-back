export class LoginUserDTO{
    username: string;
    password: string;
    
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
    }
  }