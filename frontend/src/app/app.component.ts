import { Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepositoryListComponent } from 'src/components/repository-list/repository-list.component';
import { ContextService } from 'src/services/context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("list") list!: RepositoryListComponent;
  users$: Observable<any> = of([]);
  repositories$: Observable<any> = of([]);

  constructor(private context: ContextService) {
    this.users$ = this.context.getAllUsers();
  }

  onUserChange(user: string) {
    this.repositories$ = this.context.getAllRepositoriesByUsername(user);
    this.list.reset();
  }
}
