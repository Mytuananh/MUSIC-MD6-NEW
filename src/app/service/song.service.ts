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
  API_DELETE_SONG = environment.API_LOCAL + 'delete-song';
  API_EDIT_SONG = environment.API_LOCAL + 'edit-song';
  API_DETAIL_SONG = environment.API_LOCAL + 'find-song';
  API_CREATE_SONG = environment.API_LOCAL + 'create-song';
  constructor(private http: HttpClient) { }

  listSong(): Observable<Song[]>{
    return this.http.get<Song[]>(this.API_SONG);
  }

  pageSong(request){
    const params = request;
    return this.http.get(this.API_SONG, {params});
  }

  createProduct(song: Song): Observable<Song>{
    return this.http.post<Song>(this.API_CREATE_SONG, song);
  }
  deleteSongById(id: number): Observable<Song>{
    return this.http.delete<Song>(this.API_DELETE_SONG + '/' + id);
  }

  updateSong(id: number, song: Song): Observable<Song>{
    return this.http.put<Song>(this.API_EDIT_SONG + '/' + id, song);
  }

  detailsSong(id: number): Observable<Song>{
    return this.http.get<Song>(this.API_DETAIL_SONG + '/' + id);
  }
}
