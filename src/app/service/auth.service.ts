import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {SignInForm} from '../model/SignInForm';
import {JwtResponse} from '../model/JwtResponse';
import {ChangeAvatar} from '../model/ChangeAvatar';
import {ChangePassword} from '../model/ChangePassword';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // API_LOCAL
  private API_SIGNUP = environment.API_LOCAL + 'signup';
  private API_SIGNIN = environment.API_LOCAL + 'signin';
  private API_CHANGE_AVATAR = environment.API_LOCAL + 'change-avatar';
  private API_CHANGE_PASSWORD = environment.API_LOCAL + 'change-password';
  // API_SERVE
  data: boolean;
  // private API_SIGNUP= environment.API_SERVE+'signup';
  // private API_SIGNIN = environment.API_SERVE+'signin';
  // private API_CHANGE_AVATAR = environment.API_SERVE+'change-avatar';
  constructor(private http: HttpClient) { }

  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.http.put<any>(this.API_CHANGE_PASSWORD, changePassword);
  }
  signUp(signUpForm: SignUpForm): Observable<any> {
    return this.http.post<any>(this.API_SIGNUP, signUpForm);
  }

  signIn(signInForm: SignInForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.API_SIGNIN, signInForm);
  }

  changeAvatar(changeAvatar: ChangeAvatar): Observable<ChangeAvatar> {
    return this.http.put<ChangeAvatar>(this.API_CHANGE_AVATAR, changeAvatar);
  }

  setData(data) {
    this.data = data;
  }

  getData(): boolean {
    return this.data;
  }
}
