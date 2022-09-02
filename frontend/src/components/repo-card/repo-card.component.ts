import { Component, Input, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faCodeBranch, faCoffee, faLanguage, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent implements OnInit {
  @Input() repo: any = {}

  faGithub = faGithub;
  faStars = faStar;
  faDate = faCalendar;
  faFork = faCodeBranch;
  constructor() { }

  ngOnInit(): void {
  }

  getLanguageColor(language: string) {
      switch(language){
        case 'Go': return 'text-bg-info'
        case 'JavaScript': return 'text-bg-warning'
        case 'HTML': return 'text-bg-primary'
        case 'C#': return 'text-bg-success'
        case 'Ruby': return 'text-bg-danger'
        case 'Shell': return 'text-bg-dark'
        default: return 'text-bg-secondary'
      }
  }

  cardClick() {
    window.location.href=`https://github.com/${this.repo.username}/${this.repo.repository_name}`
  }

}
