export class JwtResponse {
  public token: string;
  public username: string;
  public roles: any;
  public avatar: string;


  constructor(token: string, username: string, roles: any, avatar: string) {
    this.token = token;
    this.username = username;
    this.roles = roles;
    this.avatar = avatar;
  }
}
