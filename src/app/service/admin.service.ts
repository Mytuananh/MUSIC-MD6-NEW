import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API_PAGE_USER = environment.API_LOCAL + 'list-user';
  constructor(private http: HttpClient) { }

  pageUser(request){
    const params = request;
    return this.http.get(this.API_PAGE_USER, {params});
  }
}
