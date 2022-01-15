import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Router, RouterModule} from '@angular/router';
import {ThemePickerModule} from '../theme-picker';
import {ThemeStorage} from '../theme-picker/theme-storage/theme-storage';
import {StyleManager} from '../style-manager';
import {HttpClientModule} from '@angular/common/http';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent  implements OnInit{
  avatar: string;
  name: string;
  checkLogin = false;
  constructor(private tokenService: TokenService,
              private router: Router) {
  }
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.checkLogin = true;
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
    }
  }
  Logout() {
    this.tokenService.Logout();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ThemePickerModule,
  ],
  exports: [NavBarComponent],
  declarations: [NavBarComponent],
  providers: [StyleManager, ThemeStorage]
})
export class NavBarModule {}
