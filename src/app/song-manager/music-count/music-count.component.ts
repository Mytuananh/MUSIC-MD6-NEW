import {Component, OnInit, ViewChild} from '@angular/core';
import {AudioPlayerComponent} from '../audio-player/audio-player.component';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-music-count',
  templateUrl: './music-count.component.html',
  styleUrls: ['./music-count.component.scss']
})
export class MusicCountComponent implements OnInit {
  @ViewChild('player', { static: false })
  advancedPlayer: AudioPlayerComponent;
  songs: Song[] = [];
  currentIndex: any;
  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.loadCount();
  }

  loadCount() {
    this.songService.getSongByCount().subscribe(listSong => {
      this.songs = listSong.content;
    });
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
