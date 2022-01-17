export class SignUpForm {
  public username: string;
  public password: string;
  // tslint:disable-next-line:variable-name
  public re_password: string;
  public phoneNumber: string;
  public roles: string[];


  // tslint:disable-next-line:variable-name
  constructor(username: string, password: string, re_password: string, phoneNumber: string) {
    this.username = username;
    this.password = password;
    this.re_password = re_password;
    this.phoneNumber = phoneNumber;
    this.roles = ['user'];
  }
}
