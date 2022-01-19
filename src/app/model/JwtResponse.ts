export class JwtResponse {
  public id: number;
  public token: string;
  public username: string;
  public roles: any;
  public avatar: string;


  constructor(id: number, token: string, username: string, roles: any, avatar: string) {
    this.id = id;
    this.token = token;
    this.username = username;
    this.roles = roles;
    this.avatar = avatar;
  }
}
