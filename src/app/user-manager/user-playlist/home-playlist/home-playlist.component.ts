import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SongService} from '../../../service/song.service';
import {TokenService} from '../../../service/token.service';
import {DeletePlaylistComponent} from '../delete-playlist/delete-playlist.component';
import {CreatePlaylistComponent} from '../create-playlist/create-playlist.component';

@Component({
  selector: 'app-home-playlist',
  templateUrl: './home-playlist.component.html',
  styleUrls: ['./home-playlist.component.scss']
})
export class HomePlaylistComponent implements OnInit {
  idUser: any;
  likeList: any;
  like: any;
  playlists: any;

  constructor(public dialog: MatDialog,
              private songService: SongService,
              private tokenService: TokenService) {
  }


  ngOnInit(): void {
    this.reloadPage()
  }

  ngOnDestroy(): void {

  }


  private reloadPage() {
    this.idUser = this.tokenService.getId();
    this.songService.findAllPlaylist(this.idUser).subscribe(data => {
      this.playlists = data;
    })
  }
  openDialog2(idPlaylist:any) {
    const dialogRef = this.dialog.open(DeletePlaylistComponent);
    dialogRef.afterClosed().subscribe(resulf => {
      this.songService.deletePlaylist(idPlaylist).subscribe(data => {})
      window.location.reload();
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreatePlaylistComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.reloadPage();
    });
  }
}
