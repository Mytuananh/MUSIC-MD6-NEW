import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Singer} from '../model/Singer';


@Injectable({
  providedIn: 'root'
})
export class SingerService {
  API_SINGER = environment.API_LOCAL + 'list-singer';
  API_DELETE_SINGER = environment.API_LOCAL + 'delete-singer';
  API_EDIT_SINGER = environment.API_LOCAL + 'edit-singer';
  API_DETAIL_SINGER = environment.API_LOCAL + 'find-singer';
  API_CREATE_SINGER = environment.API_LOCAL + 'create-singer';
  API_SINGER_NO = environment.API_LOCAL + 'singer-list';
  constructor(private http: HttpClient) { }

  listSinger(): Observable<Singer[]>{
    return this.http.get<Singer[]>(this.API_SINGER_NO);
  }
  SingerList(): Observable<Singer[]>{
    return this.http.get<Singer[]>(this.API_SINGER);
  }

  pageSinger(request){
    const params = request;
    return this.http.get(this.API_SINGER, {params});
  }

  createSinger(singer: Singer): Observable<Singer>{
    return this.http.post<Singer>(this.API_CREATE_SINGER, singer);
  }
  deleteSingerById(id: number): Observable<Singer>{
    return this.http.delete<Singer>(this.API_DELETE_SINGER + '/' + id);
  }

  updateSinger(id: number, singer: Singer): Observable<Singer>{
    return this.http.put<Singer>(this.API_EDIT_SINGER + '/' + id, singer);
  }

  detailsSinger(id: number): Observable<Singer>{
    return this.http.get<Singer>(this.API_DETAIL_SINGER + '/' + id);
  }
}
