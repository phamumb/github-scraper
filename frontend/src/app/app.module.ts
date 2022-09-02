import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RepoCardComponent } from '../components/repo-card/repo-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsBarComponent } from '../components/forms-bar/forms-bar.component';
import { RepositoryListComponent } from '../components/repository-list/repository-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RepoCardComponent,
    FormsBarComponent,
    RepositoryListComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
