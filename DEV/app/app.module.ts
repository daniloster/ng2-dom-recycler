import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {Github} from "./github/shared/github";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {About, PeopleRecycled, PersonItem} from './about/about';
import {Home} from './home/home';
import {RepoBrowser} from './github/repo-browser/repo-browser';
import {RepoList, ReposRecycler, Repos2Recycler, RepoContentItem, Repo2ContentItem} from './github/repo-list/repo-list';
import {RepoDetail} from './github/repo-detail/repo-detail';

@NgModule({
  declarations: [AppComponent, About, PeopleRecycled, PersonItem, RepoBrowser, RepoList, RepoDetail, Home, ReposRecycler, Repos2Recycler, RepoContentItem, Repo2ContentItem],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [Github, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
