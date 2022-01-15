import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent implements OnInit {
  avatar: string;
  admin: any = ['ADMIN'];
  isCheckAdmin = false;
  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.avatar = this.tokenService.getAvatar();
      if (JSON.stringify(this.tokenService.getRole()) === JSON.stringify(this.admin)){
        this.isCheckAdmin = true;
      }
    }
  }
}
