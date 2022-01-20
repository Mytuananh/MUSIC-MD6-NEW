import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../model/SignInForm';
import {AuthService} from '../../service/auth.service';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  roles2: any = ['ADMIN'];
  roles1: any = ['USER'];
  Form: any = {};
  signInForm: SignInForm;
  checkRegister = false;
  status = 'Vui lòng điền thông tin Đăng nhập';
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getData()) {
      this.checkRegister = true;
    }
  }

  ngSubmit() {
    this.signInForm = new SignInForm(
      this.Form.username,
      this.Form.password
    );
    this.authService.signIn(this.signInForm).subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (data.token != undefined) {
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.username);
        this.tokenService.setRole(data.roles);
        this.tokenService.setAvatar(data.avatar);
        this.tokenService.setID(data.id);
        this.tokenService.setFullName(data.fullname);
        this.tokenService.setAddress(data.address);
        this.tokenService.setEmail(data.email);
        this.tokenService.setPhoneNumber(data.phoneNumber);
        if (JSON.stringify(this.tokenService.getRole()) === JSON.stringify(this.roles2)){
        this.router.navigate(['admin-account']).then(() => {
          window.location.reload();
        });
      }
        else if (JSON.stringify(this.tokenService.getRole()) === JSON.stringify(this.roles1)){
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }
      }
      else {
        this.status = 'Tên hoặc mật khẩu sai. Vui lòng nhập lại';
        this.checkRegister = true;
      }
    });
  }
}
