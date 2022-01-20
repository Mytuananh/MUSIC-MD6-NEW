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
status = 'Mời bạn nhập vào thông tin cần chỉnh sửa!';
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
       this.status = 'Tên đã tồn tại> Vui lòng nhập lại!'
     }
     if (JSON.stringify(data)==JSON.stringify(this.error2)){
       this.status = 'Email đã tồn tại. Vui lòng nhập lại!'
     }
     if (JSON.stringify(data)==JSON.stringify(this.error3)){
       this.status = 'Số điện thoại đã tồn tại.Vui lòng nhập lại!'
     }
     if (JSON.stringify(data)==JSON.stringify(this.success)){
       alert('Thay đổi thông tin thành công!');
       window.sessionStorage.clear();
       window.location.reload();
     }
   });
  }
}
