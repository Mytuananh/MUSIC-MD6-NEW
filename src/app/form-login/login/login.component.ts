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
  status = 'Please fill in the form Login -->';
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
        if (JSON.stringify(this.tokenService.getRole()) === JSON.stringify(this.roles2)){
        this.router.navigate(['admin-account']).then(() => {
          window.location.reload();
        });
      }
      }
      else {
        this.status = 'Username or password false, please login again';
        this.checkRegister = true;
      }
    });
  }
}
