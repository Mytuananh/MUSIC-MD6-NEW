export class ChangeProfile {
 public fullName: string;
 public address: string;
 public email: string;
 public phoneNumber: string;


  constructor(fullName: string, address: string, email: string, phoneNumber: string) {
    this.fullName = fullName;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
