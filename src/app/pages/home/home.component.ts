import {Component, OnInit} from '@angular/core';
import {SongService} from '../../service/song.service';
import {Song} from '../../model/Song';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  checkAudio = false;
  songs: Song[] = [];
  currentIndex: any;
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

