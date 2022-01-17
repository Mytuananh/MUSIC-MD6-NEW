import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {ChangeProfile} from '../../model/ChangeProfile';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss']
})
export class ChangeProfileComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
Form: any = {};
changeProfile: ChangeProfile;
status = 'Please fill in the form change you Profile!';
  error1: any = {message: 'nofullname'};
  error2: any = {message: 'noemail'};
  error3: any = {message: 'nophonenumber'};
  success: any = {massage: 'yes'};
  avatar: string;
  constructor(private authService: AuthService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.avatar = this.tokenService.getAvatar();
    }
  }

  ngSubmit() {
   this.changeProfile = new ChangeProfile(
     this.Form.fullName,
     this.Form.address,
     this.Form.email,
     this.Form.phoneNumber
   );
   this.authService.changeProfile(this.changeProfile).subscribe(data =>{
     if (JSON.stringify(data)==JSON.stringify(this.error1)){
       this.status = 'The Full Name is existed .Please try again!'
     }
     if (JSON.stringify(data)==JSON.stringify(this.error2)){
       this.status = 'The email is existed .Please try again!'
     }
     if (JSON.stringify(data)==JSON.stringify(this.error3)){
       this.status = 'The Phone Number is existed .Please try again!'
     }
     if (JSON.stringify(data)==JSON.stringify(this.success)){
       this.status = 'Change success!';
     }
   });
  }
}
