export class JwtResponse {
  public id: number;
  public token: string;
  public username: string;
  public roles: any;
  public avatar: string;
  public fullname: string;
  public address: string;
  public email: string;
  public phoneNumber: string;


  constructor(id: number, token: string, username: string, roles: any, avatar: string, fullname: string, address: string, email: string, phoneNumber: string) {
    this.id = id;
    this.token = token;
    this.username = username;
    this.roles = roles;
    this.avatar = avatar;
    this.fullname = fullname;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
