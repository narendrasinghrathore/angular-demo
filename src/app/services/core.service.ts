import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private api = {
    post: 'http://localhost:3000/posts',
    user: 'http://localhost:3000/user'
  }

  constructor(private http: HttpClient) { }

  post() {
    return this.http.get(this.api.post);
  }

  user(id: string | number) {
    return this.http.get(`${this.api.user}/${id}`);
  }

  users(){
    return this.http.get(this.api.user);
  }
}
