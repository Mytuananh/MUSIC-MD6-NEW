import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {Singer} from '../../model/Singer';
import {SongService} from '../../service/song.service';
import {SingerService} from '../../service/singer.service';
import {Router} from '@angular/router';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-create-song-user',
  templateUrl: './create-song-user.component.html',
  styleUrls: ['./create-song-user.component.scss']
})
export class CreateSongUserComponent implements OnInit {
  roles2: any = ['ADMIN'];
  roles1: any = ['USER'];
  Form: any = {};
  status = 'Please fill in the form to create song';
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
              private router: Router,
              private tokenService: TokenService) { }

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
        this.status = 'The name song is existed. Please try again!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error2)) {
        this.status = 'Please upload avatar!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error3)) {
        this.status = 'Please upload music!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.status = 'Create song success!';
      }
      if (JSON.stringify(this.tokenService.getRole()) === JSON.stringify(this.roles2)){
        this.router.navigate(['admin-account']).then(() => {
          window.location.reload();
        });
      }
      if (JSON.stringify(this.tokenService.getRole()) === JSON.stringify(this.roles1)){
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      }
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
