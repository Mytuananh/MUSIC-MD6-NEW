import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {Singer} from '../../model/Singer';
import {ActivatedRoute, Router} from '@angular/router';
import {SongService} from '../../service/song.service';
import {SingerService} from '../../service/singer.service';

@Component({
  selector: 'app-edit-singer',
  templateUrl: './edit-singer.component.html',
  styleUrls: ['./edit-singer.component.scss']
})
export class EditSingerComponent implements OnInit {
  singer: Singer;
  status = 'Vui lòng nhập thông tin để sửa';
  error1: any = {
    message: 'no_name_singer'
  };
  success: any = {
    message: 'yes'
  };
  singerList: Singer[] = [];
  constructor(private actRouter: ActivatedRoute,
              private router: Router,
              private singerService: SingerService) { }

  ngOnInit(): void {
    this.actRouter.paramMap.subscribe(singerId => {
      const id  = +singerId.get('id');
      console.log('id=== ', id);
      this.singerService.detailsSinger(id).subscribe(singer => {
        this.singer = singer;
        console.log('category voi id', this.singer);
      });
    });
  }

  onUploadAvatar($event) {
    this.singer.avatar = $event;
  }
  ngSubmit() {
    this.singerService.updateSinger(this.singer.id, this.singer).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)) {
        this.status = 'Tên ca sĩ đã tồn tại . Vui lòng nhập lại!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.status = 'Sửa thành công!';
      }
    });
  }
  Back() {
    this.router.navigate(['admin-account']);
  }
}
