import {Component, OnInit} from '@angular/core';
import {SongService} from '../../service/song.service';
import {Song} from '../../model/Song';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent implements OnInit {
  songs: any;
  currentIndex = 0;
  sub: Subscription;
  searchKey: string;
  constructor(private songService: SongService,
              private actRouter: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadCount();
  }
  loadCount() {
    this.sub = this.actRouter.paramMap.subscribe((paramMap: ParamMap)=> {
      this.searchKey = (paramMap.get('searchKey'));
    })
    this.songService.searchSongByNameOrSinger(this.searchKey).subscribe(listSong => {
      this.songs = listSong;
    });
  }
  playCurrentIndex(currentIndex: any) {
    this.currentIndex = currentIndex;
    this.songService.updateCount(this.songs[currentIndex].id).subscribe(()=>{});
    this.loadCount();
  }
}
