import { Component, OnInit } from '@angular/core';
import {ChangeAvatar} from '../../model/ChangeAvatar';
import {AuthService} from '../../service/auth.service';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {
  status = 'Please Choose File';
  changeAvatar: ChangeAvatar;
  Form: any = {};
  success: any = {
    message: 'yes'
  };
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onChangeAvatar($event) {
    this.Form.avatar = $event;
    console.log('event -->', $event);
  }

  onSubmit() {
    this.changeAvatar = new ChangeAvatar(
      this.Form.avatar
    );
    this.authService.changeAvatar(this.changeAvatar).subscribe(data => {
      console.log(data);
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.status  = 'Upload Avatar Success!';
        this.tokenService.setAvatar(this.Form.avatar);
        this.router.navigate(['admin-account']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}
