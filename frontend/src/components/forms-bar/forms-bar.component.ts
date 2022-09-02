import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-forms-bar',
  templateUrl: './forms-bar.component.html',
  styleUrls: ['./forms-bar.component.scss']
})
export class FormsBarComponent implements OnInit {
  @Input() users: any[] = [];
  @Output() onUserChange = new EventEmitter();
  @Output() onSearchTextChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  userChange(event: any) {
    this.onUserChange.emit(event.value);
  }

  searchTextChange(event: any) {
    this.onSearchTextChange.emit(event.value);
  }

}
