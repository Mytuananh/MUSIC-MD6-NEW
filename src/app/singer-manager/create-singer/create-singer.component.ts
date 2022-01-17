import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {Singer} from '../../model/Singer';
import {SongService} from '../../service/song.service';
import {SingerService} from '../../service/singer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-singer',
  templateUrl: './create-singer.component.html',
  styleUrls: ['./create-singer.component.scss']
})
export class CreateSingerComponent implements OnInit {
  Form: any = {};
  status = 'Please fill in the form to create singer';
  singer: Singer;
  checkAvatar = false;
  error1: any = {
    message: ' name_singer_exist'
  };
  error2: any = {
    message: ' no_avatar_singer'
  };
  success: any = {
    message: 'yes'
  };
  constructor(private singerService: SingerService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngSubmit() {
    // @ts-ignore
    this.singer = new Singer(
      this.Form.name,
      this.Form.age,
      this.Form.countryside,
      this.Form.avatar,
    );
    this.singerService.createSinger(this.singer).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)) {
        this.status = 'The name singer is existed. Please try again!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error2)) {
        this.status = 'Please upload avatar!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.status = 'Create singer success!';
      }
      this.router.navigate(['admin-account']);
    });
  }

  onUploadAvatar($event) {
    this.checkAvatar = true;
    this.Form.avatar = $event;
  }
}
