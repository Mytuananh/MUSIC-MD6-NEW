export class ChangePassword {
  public oldPassword?: string;
 public newPassword?: string;
  // tslint:disable-next-line:variable-name
 public re_newPassword?: string;

  // tslint:disable-next-line:variable-name
  constructor(oldPassword: string, newPassword: string, re_newPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.re_newPassword = re_newPassword;
  }
}
