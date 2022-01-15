import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Song} from '../model/Song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  API_SONG = environment.API_LOCAL + 'list-song';
  constructor(private http: HttpClient) { }

  listSong(): Observable<Song[]>{
    return this.http.get<Song[]>(this.API_SONG);
  }

  pageSong(request){
    const params = request;
    return this.http.get(this.API_SONG, {params});
  }
}
