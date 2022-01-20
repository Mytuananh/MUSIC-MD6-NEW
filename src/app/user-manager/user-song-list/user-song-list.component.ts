import { Component, OnInit } from '@angular/core';
import {SongService} from '../../service/song.service';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-user-song-list',
  templateUrl: './user-song-list.component.html',
  styleUrls: ['./user-song-list.component.scss']
})
export class UserSongListComponent implements OnInit {
  userId: any;
  songs: any;
  currentIndex = 0;
  constructor(private songService: SongService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.userId = this.tokenService.getId();
    this.loadCount();
  }

  loadCount() {
    this.songService.getSongListByUser_Id(this.userId).subscribe(listSong => {
      this.songs = listSong;
    });
  }


  playCurrentIndex(currentIndex: any) {
    this.currentIndex = currentIndex;
    this.songService.updateCount(this.songs[currentIndex].id).subscribe(()=>{});
    this.loadCount();
  }
}
