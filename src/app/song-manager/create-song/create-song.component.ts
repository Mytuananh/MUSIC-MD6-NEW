import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';
import {SingerService} from '../../service/singer.service';
import {Singer} from '../../model/Singer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
  Form: any = {};
  status = 'Vui lòng điền vào dưới đây để tạo bài hát';
  song: Song;
  checkAvatar = false;
  checkFile = false;
  singerList: Singer[] = [];
  error1: any = {
    message: ' name_song_exist'
  };
  error2: any = {
    message: ' no_avatar_song'
  };
  error3: any = {
    message: ' no_music_song'
  };
  success: any = {
    message: 'yes'
  };
  constructor(private songService: SongService,
              private singerService: SingerService,
              private router: Router) { }

  ngOnInit(): void {
    this.singerService.listSinger().subscribe(listSinger => {
      this.singerList = listSinger;
    });
  }

  ngSubmit() {
    // @ts-ignore
    this.song = new Song(
      this.Form.name,
      this.Form.description,
      this.Form.file,
      this.Form.singers,
      this.Form.musician,
      this.Form.avatar,
      this.Form.count,
      this.Form.countLike
    );
    this.songService.createSong(this.song).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)) {
        this.status = 'Tên bài hát đã tồn tại > Vui lòng nhập lại!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error2)) {
        this.status = 'Mời chọn ảnh đại diện!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error3)) {
        this.status = 'Mời chọn nhạc!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.status = 'Tạo mới thành công!';
      }
      this.router.navigate(['admin-account']);
    });
  }

  onUploadAvatar($event) {
    this.checkAvatar = true;
    this.Form.avatar = $event;
  }

  onUploadMusic($event) {
    this.checkFile = true;
    this.Form.file = $event;
  }

}
