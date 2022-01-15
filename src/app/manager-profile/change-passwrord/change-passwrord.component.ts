import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ChangePassword} from '../../model/ChangePassword';
import {AuthService} from '../../service/auth.service';
@Component({
  selector: 'app-change-passwrord',
  templateUrl: './change-passwrord.component.html',
  styleUrls: ['./change-passwrord.component.scss']
})
export class ChangePasswrordComponent implements OnInit {
  hide = true;
  Form: any = {};
  changePassword: ChangePassword = {};
  hide1= true;
  hide2= true;

  constructor(private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.changePassword = new ChangePassword(
      this.Form.oldPassword,
      this.Form.newPassword,
      this.Form.re_newPassword
    );
this.authService.changePassword(this.changePassword).subscribe(data => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'ok',
    showConfirmButton: false,
    timer: 2000
  });
},error => {if (error.status === 400){ Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'error',
  title: 'ok',
  showConfirmButton: false,
  timer: 2000
});}})
  }
}
