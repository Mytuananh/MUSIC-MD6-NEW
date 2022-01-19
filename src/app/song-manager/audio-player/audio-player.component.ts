import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SongService} from '../../service/song.service';
import * as moment from "moment";
import {Song} from '../../model/Song';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit,OnChanges {
  @Input()
  set playlist(playlist: Song[]) {
    this.songService.setPlaylist(playlist);
  }
  @Output() eventEmitter = new EventEmitter();

  constructor(private songService: SongService,
              elem: ElementRef) {

  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  displayedColumns: string[];
  dataSource = new MatTableDataSource<Song>();
  paginator: MatPaginator;
  repeat = 'all';


  songs: Song[] = [];

  @Input() displayName = true;
  @Input() displayPlaylist = true;
  @Input() displayVolumeControls = true;
  @Input() displayRepeatControls = true;
  @Input() pageSizeOptions = [10, 20, 30];
  @Input() expanded = true;
  @Input() autoPlay = false;
  @Input() disablePositionSlider = false;
  @Input() displaySinger = false;
  @Input() displayDuration = false;

  // Support for internationalization
  @Input() tableHeader = 'Playlist';
  @Input() nameHeader = 'name';
  @Input() singerHeader = 'singer';
  @Input() durationHeader = 'Duration';


  currentIndex = 0;

  @Output()
  songEnded: Subject<string> = new Subject<string>();

  @ViewChild('audioPlayer', { static: true }) player: ElementRef;

  iOS = (/iPad|iPhone|iPod/.test(navigator.platform)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  loaderDisplay = false;
  isPlaying = false;
  currentTime = 0;
  volume = 0.1;
  duration = 0.01;

  private startOffsetValue = 0;
  @Input()
  set startOffset(seconds: number) {
    this.startOffsetValue = seconds;
    this.player.nativeElement.currentTime = seconds;
  }
  get startOffset(): number {
    return this.startOffsetValue;
  }

  @Input()
  public endOffset = 0;

  currTimePosChanged(event) {
    this.player.nativeElement.currentTime = event.value;
  }

  bindPlayerEvent(): void {

    this.player.nativeElement.addEventListener('playing', () => {
      this.isPlaying = true;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });
    this.player.nativeElement.addEventListener('pause', () => {
      this.isPlaying = false;
    });
    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this.player.nativeElement.currentTime);
    });
    this.player.nativeElement.addEventListener('volume', () => {
      this.volume = Math.floor(this.player.nativeElement.volume);
    });
    if (!this.iOS) {
      this.player.nativeElement.addEventListener('loadstart', () => {
        this.loaderDisplay = true;
      });
    }
    this.player.nativeElement.addEventListener('loadedmetadata', () => {
      this.loaderDisplay = false;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });
    this.player.nativeElement.addEventListener('ended', () => {
      this.songEnded.next('ended');
    });

  }

  playBtnHandler(): void {
    if (this.loaderDisplay) {
      return;
    }
    if (this.player.nativeElement.paused) {
      if (this.currentTime >= this.duration - this.endOffset) {
        this.player.nativeElement.currentTime = this.startOffset;
      } else {
        this.player.nativeElement.currentTime = this.currentTime;
      }

      this.player.nativeElement.play();
    } else {
      this.currentTime = this.player.nativeElement.currentTime;
      this.player.nativeElement.pause();
    }
  }

  play(song?: Song): void {
    if (song) {
      this.startOffset = song.startOffset || 0;
      this.endOffset = song.endOffset || 0;
    }

    setTimeout(() => {
      this.player.nativeElement.play();
    }, 50);

  }

  toggleVolume() {
    if (this.volume === 0) {
      this.setVolume(1.0);
    } else {
      this.setVolume(0);
    }
  }

  toggleRepeat() {
    if (this.repeat === 'none') {
      this.repeat = 'all';
    } else if (this.repeat === 'all') {
      if (this.songs.length > 1) {
        this.repeat = 'one';
      } else {
        this.repeat = 'none';
      }
    } else if (this.repeat === 'one' && this.songs.length > 1) {
      this.repeat = 'none';
    }
  }

  private setVolume(vol) {
    this.volume = vol;
    this.player.nativeElement.volume = this.volume;
  }

  ngOnInit() {

    this.bindPlayerEvent();

    // auto play next track
    this.player.nativeElement.addEventListener('ended', () => {
      if (this.checkIfSongHasStartedSinceAtleastTwoSeconds()) {
        if (this.repeat === 'all') {
          this.nextSong();
        } else if (this.repeat === 'one') {
          this.play();
        } else if (this.repeat === 'none') {
          // Do nothing
        }
      }
    });

    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.songService.setCurrentTime(this.player.nativeElement.currentTime);
    });

    // Subscribe to playlist observer from AudioPlayerService and
    // update the playlist within MatAdvancedAudioPlayerComponent
    this.songService.getPlaylist().subscribe(songs => {
      if (songs !== null && songs !== []) {
        this.songs = songs;
        this.initialize();
      }
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('displaySinger') || changes.hasOwnProperty('displayDuration')) {
      this.buildDisplayedColumns();
    }
  }

  private buildDisplayedColumns() {
    this.displayedColumns = ['name'];
    if (this.displaySinger) {
      this.displayedColumns.push('singer');
    }
    if (this.displayDuration) {
      this.displayedColumns.push('duration');
    }
    this.displayedColumns.push('status');
  }

  initialize() {
    this.buildDisplayedColumns();

    // populate indexs for the track and configure
    // material table data source and paginator
    this.setDataSourceAttributes();


    this.player.nativeElement.currentTime = this.startOffset;
    this.updateCurrentSong();

    if (this.autoPlay) {
      this.play();
    }
  }

  setDataSourceAttributes() {
    let index = 1;
    if (this.songs) {
      this.songs.forEach((song: Song) => {
        song.index = index++;
      });
      this.dataSource = new MatTableDataSource<Song>(this.songs);
      this.dataSource.paginator = this.paginator;
    }
  }

  nextSong(): void {
    if (this.displayPlaylist === true
      && (((this.currentIndex + 1) % this.paginator.pageSize) === 0
        || (this.currentIndex + 1) === this.paginator.length)) {
      if (this.paginator.hasNextPage()) {
        this.paginator.nextPage();
      } else if (!this.paginator.hasNextPage()) {
        this.paginator.firstPage();
      }
    }
    this.currentTime = 0;
    this.duration = 0.01;
    if ((this.currentIndex + 1) >= this.songs.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.updateCurrentSong();
    this.play();
  }

  previousSong(): void {
    this.currentTime = 0;
    this.duration = 0.01;
    if (!this.checkIfSongHasStartedSinceAtleastTwoSeconds()) {
      if (this.displayPlaylist === true
        && (((this.currentIndex) % this.paginator.pageSize) === 0
          || (this.currentIndex === 0))) {
        if (this.paginator.hasPreviousPage()) {
          this.paginator.previousPage();
        } else if (!this.paginator.hasPreviousPage()) {
          this.paginator.lastPage();
        }
      }
      if ((this.currentIndex - 1) < 0) {
        this.currentIndex = (this.songs.length - 1);
      } else {
        this.currentIndex--;
      }
    } else {
      this.resetSong();
    }
    this.updateCurrentSong();
    this.play();
  }

  resetSong(): void {
    this.player.nativeElement.src = this.songs[this.currentIndex].file;
  }
  selectSong(index: number): void {
    this.currentIndex = index - 1;
    this.updateCurrentSong();
    this.play();
  }

  checkIfSongHasStartedSinceAtleastTwoSeconds(): boolean {
    return this.player.nativeElement.currentTime > 2;
  }

  updateCurrentSong() {
    this.songService.setCurrentSong(this.songs[this.currentIndex]);
    if (this.checkIfSongHasStartedSinceAtleastTwoSeconds()){
      this.songService.updateCount(this.songs[this.currentIndex].id).subscribe(()=>{});
    }

  }

}
