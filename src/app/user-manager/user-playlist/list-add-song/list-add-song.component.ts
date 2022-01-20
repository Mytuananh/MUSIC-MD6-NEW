import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-list-add-song',
  templateUrl: './list-add-song.component.html',
  styleUrls: ['./list-add-song.component.scss']
})
export class ListAddSongComponent implements OnInit {
  songs: any;
  selectItem: any;
  chekcItem: any;
  playlistAdd: any;
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private songService: SongService) {
  }

  public formdata = this.formBuilder.group({
    name: [''],
  })

  ngOnInit(): void {
    this.selectItem = new Array<number>();
  }

  pushItem(event: any, idSong: string) {
    if (event.target.checked) {
      this.selectItem.push(Number(idSong));
    } else {
      this.selectItem = this.selectItem.filter(function (id: number) {
        return id != Number(idSong);
      })
    }

    if (this.selectItem.length != 0) {
      this.chekcItem = true;
    } else {
      this.chekcItem = false;
    }
  }

  ngSubmit(f: any) {
    console.log(f.value);
    this.name = f.value.name;
  }

  onSubmit(f: any) {
    console.log(f.value);
    this.name = f.value.name;
    this.songService.searchSongByNameOrSinger(this.name).subscribe(listSong => {
      this.songs = listSong;
    });
  }

  addSong() {
    this.playlistAdd = {
      idPlaylist: this.data,
      idSongs: this.selectItem
    }
    this.songService.addSongToList(this.playlistAdd).subscribe(data => {
      this.selectItem = new Array<number>();
      this.chekcItem = false;
    })
  }
}
