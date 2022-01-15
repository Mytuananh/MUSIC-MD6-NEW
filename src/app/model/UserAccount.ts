export class UserAccount {
  id: number;
  username: string;
  phoneNumber: string;
  avatar: string;
  roles: any;
  constructor(id: number, username: string, phoneNumber: string, avatar: string, roles: any) {
    this.id = id;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
    this.roles = roles;
  }
}
