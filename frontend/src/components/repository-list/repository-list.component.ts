import { AfterContentInit, AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {
  @Input() repositories: any[] = [];
  private reposPerPage = 12;
  displayRepos: any[] = [];
  currentPage = 0;
  pages = 0;
  constructor() { }

  ngOnInit(): void {
    this.repositories.length
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.repositories) {
      this.pages = Math.ceil(this.repositories.length / this.reposPerPage)
      this.paginate();
    }
  }

  counter(num: number) {
    console.log(num)
    return Array(num);
  }

  pageSelect(num: number) {
    this.currentPage = num;
    this.paginate()
  }

  nextPage() {
    if(this.currentPage < this.pages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previousPage() {
    if(this.currentPage > 0) {
      this.currentPage--;
      this.paginate();
    }
  }

  paginate() {
    let start = this.currentPage * this.reposPerPage;
    let end = (this.currentPage + 1) * this.reposPerPage;
    this.displayRepos = this.repositories.slice(start, end)
  }

  reset() {
    this.pages = 0;
    this.currentPage = 0;
  }

}
