import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContextService } from 'src/services/context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users$: Observable<any> = of([]);
  repositories$: Observable<any> = of([]);

  constructor(private context: ContextService) {
    this.users$ = this.context.getAllUsers();
  }

  onUserChange(event: any) {
    this.repositories$ = this.context.getAllRepositoriesByUsername(event.value);
  }

  onTextSearch(text: any) {
    console.log(text.value);
  }
}
