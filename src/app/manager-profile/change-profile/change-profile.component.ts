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
  emailFormControl = new FormControl('',[
    Validators.required,
    Validators.email
  ]);
Form: any = {};
changeProfile: ChangeProfile;
status = 'Please fill in the form change you Profile!'
  error1:  any ={message: 'no_email'};
  error2:  any ={message: 'yes'};
  success: any = {massage: 'yes'}
  avatar: string;
  constructor(private authService: AuthService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.avatar = this.tokenService.getAvatar();
    }
  }

  ngSubmit() {
   this.changeProfile = new ChangeProfile(this.Form.fullName,
     this.Form.address,
     this.Form.email,
     this.Form.phoneNumber
   )
  }
}
