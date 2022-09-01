import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private api: ApiService) { }

  getAllRepositories() {
    return this.api.getAllRepositories();
  }

  getAllRepositoriesByUsername(username: string) {
    return this.api.getAllRepositoriesByUsername(username);
  }

  getAllUsers() {
    return this.api.getAllUsers();
  }
}
