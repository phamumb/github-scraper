import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.dataUrl;
  constructor(private http: HttpClient) { }

  getAllRepositories() {
    return this.http.get(`${this.url}/repositories`)
  }

  getAllRepositoriesByUsername(username: string) {
    return this.http.get(`${this.url}/repositories/${username}`);
  }

  getAllUsers() {
    return this.http.get(`${this.url}/repositories/users`)
  }
}
