import {Component, OnInit, ViewChild} from '@angular/core';
import {AudioPlayerComponent} from '../audio-player/audio-player.component';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-music-suggest',
  templateUrl: './music-suggest.component.html',
  styleUrls: ['./music-suggest.component.scss']
})
export class MusicSuggestComponent implements OnInit {
  songs: any;
  currentIndex = 0;
  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.loadCount();
  }

  loadCount() {
    this.songService.songList().subscribe(listSong => {
      this.songs = listSong.content;
    });
  }


  playCurrentIndex(currentIndex: any) {
    this.currentIndex = currentIndex;
    this.songService.updateCount(this.songs[currentIndex].id).subscribe(()=>{});
    this.loadCount();
  }
}
