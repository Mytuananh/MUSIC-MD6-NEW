import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  totalElements: any = 0;
  songs: Song[] = [];
  loading: boolean;
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getListRequest({page: 0, size: 3});
  }
  private getListRequest(request) {
    this.loading = true;
    this.songService.pageSong(request).subscribe(data => {
      console.log('data --> ', data);
      this.songs = data.content;
      console.log('data[content] ---->', data.content);
      this.totalElements = data.totalElements;
      console.log('data[totalElements] == ', data.totalElements);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  nextPage(event: PageEvent) {
    console.log('event -->', event);
    const request = {};
    // @ts-ignore
    request.page = event.pageIndex.toString();
    // @ts-ignore
    request.size = event.pageSize.toString();
    // @ts-ignore
    console.log('request[size]', request.size);
    this.getListRequest(request);
  }
}
