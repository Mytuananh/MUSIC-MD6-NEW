import { Injectable } from '@angular/core';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_key';
const AVATAR_KEY = 'Avatar_key';
const FULL_NAME_KEY = 'FullName_key';
const ID_KEY = 'Id_Key';
const ADDRESS_KEY = 'Address_key';
const EMAIL_KEY = 'Email_key';
const PHONE_NUMBER_KEY = 'PhoneNumber_key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: Array<string> = [];
  constructor() { }
  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public setAddress(address: string) {
    window.sessionStorage.removeItem(ADDRESS_KEY);
    window.sessionStorage.setItem(ADDRESS_KEY, address);
  }

  public getAddress(): string{
    return window.sessionStorage.getItem(ADDRESS_KEY);
  }
  public setEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string{
    return window.sessionStorage.getItem(EMAIL_KEY);
  }
  public setPhoneNumber(phoneNumber: string) {
    window.sessionStorage.removeItem(PHONE_NUMBER_KEY);
    window.sessionStorage.setItem(PHONE_NUMBER_KEY, phoneNumber);
  }

  public getPhoneNumber(): string{
    return window.sessionStorage.getItem(PHONE_NUMBER_KEY);
  }
  public setFullName(fullname: string) {
    window.sessionStorage.removeItem(FULL_NAME_KEY);
    window.sessionStorage.setItem(FULL_NAME_KEY, fullname);
  }

  public getFullName(): string{
    return window.sessionStorage.getItem(FULL_NAME_KEY);
  }

  public setName(name: string){
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, name);
  }

  public getName(): string{
    return window.sessionStorage.getItem(NAME_KEY);
  }

  public setRole(roles: string[]) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }

  public getRole(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(role => {
        this.roles.push(role.authority);
      });
    }
    return this.roles;
  }

  public setAvatar(avatar: string){
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(AVATAR_KEY, avatar);
  }

  public getAvatar(): string{
    return window.sessionStorage.getItem(AVATAR_KEY);
  }

  public Logout() {
    window.sessionStorage.clear();
    window.location.reload();
  }

  public setID(id: number){
    window.sessionStorage.removeItem(ID_KEY);
    // @ts-ignore
    window.sessionStorage.setItem(ID_KEY, id);
  }

  public getId(): number{
    // @ts-ignore
    return window.sessionStorage.getItem(ID_KEY);
  }

}
