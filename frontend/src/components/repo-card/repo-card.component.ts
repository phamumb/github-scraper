import { Component, ElementRef, Input, OnInit } from '@angular/core';
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

  boxShadowStyle = ''
  constructor() { }

  ngOnInit(): void {
  }

  getLanguageColor(language: string) {
      switch(language){
        case 'Go': return '#00ADD8'
        case 'JavaScript': return '#f1e05a'
        case 'HTML': return '#e34c26'
        case 'C#': return '#178600'
        case 'Objective-C': return '#438eff'
        case 'C++': return '#f34b7d'
        case 'Ruby': return '#701516'
        case 'Shell': return '#89e051'
        case 'TypeScript': return '#3178c6'
        case 'CSS': return '#563d7c'
        case 'Python': return '#3572A5'
        case 'Java': return '#b07219'
        case 'Smarty': return '#f0c040'
        case 'Elixir': return '#6e4a7e'
        case 'C': return '#555555'
        case 'PHP': return '#4F5D95'
        case 'Haskell': return '#29b544'
        default: return 'grey'
      }
  }

  cardClick() {
    window.location.href=`https://github.com/${this.repo.username}/${this.repo.repository_name}`
  }

  mouseenter() {
    this.boxShadowStyle = `box-shadow: 0 5px 15px ${this.getLanguageColor(this.repo.language)};`
  }

  mouseleave() {
    this.boxShadowStyle = 'box-shadow: 0 5px 15px rgba(154, 150, 156, 0.4);'
  }

}
