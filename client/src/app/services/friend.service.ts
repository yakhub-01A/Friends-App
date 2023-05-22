import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend.model';

const baseUrl = 'http://localhost:8080/api/friends';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Friend[]> {
    return this.http.get<Friend[]>(baseUrl);
  }

  get(id: any): Observable<Friend> {
    return this.http.get<Friend>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${baseUrl}?title=${title}`);
  }
}