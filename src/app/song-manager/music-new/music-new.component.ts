import {Component, OnInit, ViewChild} from '@angular/core';
import {AudioPlayerComponent} from '../audio-player/audio-player.component';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-music-new',
  templateUrl: './music-new.component.html',
  styleUrls: ['./music-new.component.scss']
})
export class MusicNewComponent implements OnInit {
  songs: any;
  currentIndex = 0;
  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.loadCount();
  }

  loadCount() {
    this.songService.getSongLater().subscribe(listSong => {
      this.songs = listSong.content;
    });
  }


  playCurrentIndex(currentIndex: any) {
    this.currentIndex = currentIndex;
    this.songService.updateCount(this.songs[currentIndex].id).subscribe(()=>{});
    this.loadCount();
  }
}
