import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {BehaviorSubject, Observable} from 'rxjs';
import {Song} from '../model/Song';
import {Comments} from '../model/Comments';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  constructor(private http: HttpClient) { }
  API_SONG = environment.API_LOCAL + 'list-song';
  API_DELETE_SONG = environment.API_LOCAL + 'delete-song';
  API_EDIT_SONG = environment.API_LOCAL + 'edit-song';
  API_DETAIL_SONG = environment.API_LOCAL + 'find-song';
  API_CREATE_SONG = environment.API_LOCAL + 'create-song';
  API_SONG_MU = environment.API_LOCAL + 'song-list';
  API_SONG_LATER = environment.API_LOCAL + 'latest';
  API_SONG_COUNT = environment.API_LOCAL + 'updateCount';
  API_SONG_COUNT_MAX = environment.API_LOCAL + 'song-count';
  API_FIND_SONG = environment.API_LOCAL + 'find-song';
  API_SONG_LIKE = environment.API_LOCAL + 'like';
  API_SONG_COMMENT = environment.API_LOCAL + 'comment';
  API_SONG_SEARCH = environment.API_LOCAL + 'search';

  checkLogin$ = new BehaviorSubject<string>('');
  checkCurrent$ = new BehaviorSubject<string>('');
  search$ = new BehaviorSubject<string>('');


  listSong(): Observable<Song[]>{
    return this.http.get<Song[]>(this.API_SONG_MU);
  }

  pageSong(request){
    const params = request;
    return this.http.get(this.API_SONG, {params});
  }

  songList(): Observable<any> {
    return this.http.get<any>(this.API_SONG);
  }

  createSong(song: Song): Observable<Song>{
    return this.http.post<Song>(this.API_CREATE_SONG, song);
  }
  deleteSongById(id: number): Observable<Song>{
    return this.http.delete<Song>(this.API_DELETE_SONG + '/' + id);
  }

  findSong(idSong: number): Observable<any>{
    return this.http.get<any>(this.API_FIND_SONG + '/' + idSong);
  }

  updateSong(id: number, song: Song): Observable<Song>{
    return this.http.put<Song>(this.API_EDIT_SONG + '/' + id, song);
  }

  detailsSong(id: number): Observable<Song>{
    return this.http.get<Song>(this.API_DETAIL_SONG + '/' + id);
  }

  getSongLater(): Observable<any> {
    return this.http.get<any>(this.API_SONG_LATER);
  }

  updateCount(id: any): Observable<any> {
    return this.http.put<any>(this.API_SONG_COUNT, id);
  }

  getSongByCount(): Observable<any> {
    return this.http.get<any>(this.API_SONG_COUNT_MAX);
  }

  likeThis(like: any): Observable<any> {
    return this.http.post(this.API_SONG_LIKE, like);
  }

  unLike(id: any): Observable<any> {
    return this.http.delete<any>(this.API_SONG_LIKE + '/' + id);
  }

  commentSong(comment: Comments): Observable<any> {
    return this.http.post(this.API_SONG_COMMENT, comment);
  }

  findAllComment(id: any) {
    return this.http.get(this.API_SONG_COMMENT + '/' + id)
  }

  searchSongByNameOrSinger(nameSearch: string): Observable<any> {
    return this.http.get<any>(this.API_SONG_SEARCH + '/' + nameSearch);
  }
}
