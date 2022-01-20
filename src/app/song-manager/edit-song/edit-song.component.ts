import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {ActivatedRoute, Router} from '@angular/router';
import {SongService} from '../../service/song.service';
import {Singer} from '../../model/Singer';
import {SingerService} from '../../service/singer.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {
  song: Song;
  status = 'Vui lòng nhập thông tin để sửa!';
  error1: any = {
    message: 'no_name_song'
  };
  success: any = {
    message: 'yes'
  };
  singerList: Singer[] = [];
  constructor(private actRouter: ActivatedRoute,
              private songService: SongService,
              private router: Router,
              private singerService: SingerService) { }

  ngOnInit(): void {
    this.singerService.listSinger().subscribe(listSinger => {
      this.singerList = listSinger;
    });
    this.actRouter.paramMap.subscribe(songId => {
      const id  = +songId.get('id');
      console.log('id=== ', id);
      this.songService.detailsSong(id).subscribe(song => {
        this.song = song;
        console.log('category voi id', this.song);
      });
    });
  }

  onUploadAvatar($event) {
    this.song.avatar = $event;
  }
  onUploadMusic($event) {
    this.song.file = $event;
  }
  ngSubmit() {
    this.songService.updateSong(this.song.id, this.song).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)) {
        this.status = 'Tên bài hát đã tồn tại. Vui lòng nhập lại!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.status = 'Cập nhật thành công!';
      }
    });
  }
  Back() {
    this.router.navigate(['admin-account']);
  }
}
