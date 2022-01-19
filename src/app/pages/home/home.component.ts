import {Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../service/song.service';
import {Song} from '../../model/Song';
import {AudioPlayerComponent} from '../../song-manager/audio-player/audio-player.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  @ViewChild('player', { static: false })
  advancedPlayer: AudioPlayerComponent;
  songs: Song[] = [];
  songs1: Song[] = [];
  songs2: Song[] = [];
  currentIndex: any;
  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.loadCount();
    this.getSongByCount();
    this.songList();
  }

  songList() {
    this.songService.listSong().subscribe(songList => {
      this.songs = songList;
    })
  }

  loadCount() {
    this.songService.getSongLater().subscribe(listSong => {
      this.songs2 = listSong.content;
    });
  }

  getSongByCount() {
    this.songService.getSongByCount().subscribe(list => {
      this.songs1 = list.content;
    })
  }

  playCurrentIndex(currentIndex: any) {
    this.currentIndex = currentIndex;
    this.songService.updateCount(this.songs[currentIndex].id).subscribe(()=>{});
    this.loadCount();
  }

  currentSong: Song = null;
  currentTime: any;

  appendSongToPlaylistDisable = false;
  counter = 1;

  onEnded(event) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.

    // example
    this.currentSong = null;
  }

  consoleLogCurrentData() {
    // logCurrentTrack();
    // logCurrentTime();
    // Make sure to subscribe (by calling above methods)
    // before getting the data
    console.log(this.currentSong.name + ' : ' + this.currentTime);
  }

}

