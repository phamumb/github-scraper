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
      this.buildPagination(this.repositories);
    }
  }

  searchText(text: string) {
    let formattedText = text.toLowerCase();
    var filteredRepos = this.repositories.filter(repo => {
      return repo.repository_name.toLowerCase().includes(formattedText) || 
            repo.language.toLowerCase().includes(formattedText) || 
            repo.description.toLowerCase().includes(formattedText)
    })
    this.buildPagination(filteredRepos);
  }

  buildPagination(repos: any[]) {
    this.pages = Math.ceil(repos.length / this.reposPerPage)
    this.paginate(repos);
  }

  counter(num: number) {
    return Array(num);
  }

  pageSelect(num: number) {
    this.currentPage = num;
    this.paginate(this.repositories)
  }

  nextPage() {
    if(this.currentPage < this.pages) {
      this.currentPage++;
      this.paginate(this.repositories);
    }
  }

  previousPage() {
    if(this.currentPage > 0) {
      this.currentPage--;
      this.paginate(this.repositories);
    }
  }

  paginate(repos: any[]) {
    let start = this.currentPage * this.reposPerPage;
    let end = (this.currentPage + 1) * this.reposPerPage;
    this.displayRepos = repos.slice(start, end)
  }

  reset() {
    this.pages = 0;
    this.currentPage = 0;
  }

}
