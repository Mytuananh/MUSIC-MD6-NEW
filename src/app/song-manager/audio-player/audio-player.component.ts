import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {SongService} from '../../service/song.service';
// @ts-ignore
import * as moment from 'moment';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  @Input() songs: any;
  @Output() eventEmitter = new EventEmitter();

  constructor(private songService: SongService) {
  }

  ngAfterViewInit(): void {
    this.songService.checkCurrent$.subscribe(data => {
      this.currentIndex = Number(data);
      this.play();
    });
  }

  ngOnInit(): void {
    this.currentIndex = 0;
    this.currentTime = 0;
    this.totalTime = 0;
    this.checkplay = true;
    this.currentTime = moment.utc(0).format('mm:ss');
    this.totalTime = moment.utc(0).format('mm:ss');
  }
  audio = new Audio();
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart'
  ];
  currentIndex = 0;
  currentTime: any;
  currentRange = 0;
  totalRang = 0;
  totalTime: any;
  checkplay = true;
  nameSong: any;

  play() {
    this.eventEmitter.emit(this.currentIndex);
    this.nameSong = this.songs[this.currentIndex].name;
    if (this.checkplay && this.currentRange == 0) {
      this.streamObserver(this.songs[this.currentIndex].file).subscribe();
      this.checkplay = false;
    } else if (this.checkplay && this.currentRange != 0) {
      this.audio.play();
      this.checkplay = false;
    } else {
      this.audio.pause()
      this.checkplay = true;
    }
  }

  next() {
    this.currentRange = 0;
    this.checkplay = true;
    if (this.currentIndex < this.songs.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.play();
  }

  prev() {
    this.currentRange = 0;
    this.checkplay = true;
    if (this.currentIndex == 0) {
      this.currentIndex = this.songs.length;
    } else {
      this.currentIndex--;
    }
    this.play();
  }


  streamObserver(url: string) {
    return new Observable(() => {
      this.audio.src = url;
      this.audio.load();
      this.audio.play();
      const handler = (event: Event) => {
        this.currentTime = moment.utc(this.audio.currentTime * 1000).format("mm:ss");
        this.totalTime = moment.utc(this.audio.duration * 1000).format("mm:ss");
        this.totalRang = this.audio.duration;
        this.currentRange = this.audio.currentTime;
        if (this.audio.currentTime == this.audio.duration) {
          this.next();
        }
      }
      this.addEvent(this.audio, this.audioEvents, handler);
      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.removeEvent(this.audio, this.audioEvents, handler)
      }
    })
  }

  private addEvent(audio: HTMLAudioElement, audioEvents: string[], handler: (event: Event) => void) {
    audioEvents.forEach(event => {
      audio.addEventListener(event, handler)
    })
  }

  private removeEvent(audio: HTMLAudioElement, audioEvents: string[], handler: (event: Event) => void) {
    audioEvents.forEach(event => {
      audio.removeEventListener(event, handler)
    })
  }

  setProsess(myRange: HTMLInputElement) {
    this.audio.currentTime = Number(myRange.value);
  }

  ngOndestroy(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.checkplay = true;
  }

}
