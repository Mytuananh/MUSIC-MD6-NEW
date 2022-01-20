import {Component, NgModule, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {TokenService} from '../../service/token.service';
import {Song} from '../../model/Song';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent  implements OnInit{
  searchKey: string;
  songs: Song[] = [];
  roles2: any = ['ADMIN'];
  avatar: string;
  name: string;
  checkLogin = false;
  checkAdmin = false;
  constructor(private tokenService: TokenService,
              private router: Router) {
  }
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.checkLogin = true;
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
    }
    if (this.tokenService.getToken() && JSON.stringify(this.tokenService.getRole()) === JSON.stringify(this.roles2)){
      this.checkAdmin = true;
    }
  }

  Logout() {
    this.tokenService.Logout();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
  addSong() {
    this.router.navigate(['create-song']).then(() => {
      window.location.reload();
    });
  }


  ngSubmit(f: any) {
    console.log(f.value);
    this.searchKey = f.value.searchKey;
    if(this.searchKey == ""){
      this.router.navigate([``])
    }
    else {
      this.router.navigate(['/song-search/', this.searchKey])
    }
  }
}


