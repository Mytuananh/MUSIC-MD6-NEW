import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-manage',
  templateUrl: './change-manage.component.html',
  styleUrls: ['./change-manage.component.scss']
})
export class ChangeManageComponent implements OnInit {
  avatar: string;
  name: string;
  fullname: string;
  address: string;
  email: string;
  phoneNumber:string;

  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.avatar = this.tokenService.getAvatar();
      this.name = this.tokenService.getName();
      this.fullname = this.tokenService.getFullName();
      this.address = this.tokenService.getAddress();
      this.email = this.tokenService.getEmail();
      this.phoneNumber =this.tokenService.getPhoneNumber();
    }
  }

}
