import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SongService} from '../../service/song.service';
import {TokenService} from '../../service/token.service';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit, OnDestroy {
  checklogin = false;
  idUser: any;
  liked = false;
  likesList: any;
  idLike: any;
  like: any;
  @Input() song: any;

  constructor(public dialog: MatDialog, private songService: SongService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.checkLogin();
    if(this.checklogin){
      this.checkLike(this.song);
    }
  }

  checkLogin() {
    this.idUser = this.tokenService.getId();
    if (this.idUser != null) {
      this.checklogin = true
    }
  }

  checkLike(song: any) {
    this.liked = false;
    if(song.likesList.length>0){
      for (let likes of song.likesList) {
        if (likes.user.id == this.idUser) {
          this.liked = true;
          this.idLike = likes.id;
          return;
        }
      }
    }
  }

  getSong(idSong: any) {
    this.songService.findSong(idSong).subscribe(data => {
      this.checkLike(data);
      this.song = data;
    })
  }

  likeThis(idSong: any) {
    this.like = {
      idUser: this.idUser,
      idSong: idSong
    }
    this.songService.likeThis(this.like).subscribe(() => {
      this.getSong(idSong);
    })

  }

  unLikeThis(idSong: any) {
    this.songService.unLike(this.idLike).subscribe(() => {
      this.getSong(idSong);
    })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: this.song
    });
  }

  ngOnDestroy(): void {
    this.checkLogin();
  }

  playThisSong(song: any) {
    this.songService.checkCurrent$.next(song.id)
  }
}
