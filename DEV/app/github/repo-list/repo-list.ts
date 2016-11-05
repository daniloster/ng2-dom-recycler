import { ViewRef, Component, OnInit, Input, Output, Injectable } from '@angular/core';
import { Github } from '../shared/github';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Repo } from './repo';
import { RepoContentItem, selector as repoSelector } from './repo-content-item';
import { Repo2ContentItem, selector as repo2Selector } from './repo2-content-item';
import { getDynamicDomRecycler } from '../../../../src/dom.recycler';

@Component({
    selector: 'repo-list',
    styleUrls: [`
        .repo-container {
            height: 300px;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
    `],
    template: `
        <h3>Repo list</h3>
        <div *ngIf="!!items" class="repo-container">
            <repos-recycler
                [items]="items"
                [itemHeight]="115"
                [totalBufferMargin]="3"
            ></repos-recycler>
        </div>

        <br />
        <br />

        <h3>Repo2 list</h3>
        <div *ngIf="!!items" class="repo-container">
            <repos2-recycler
                [items]="items"
                [itemHeight]="22"
                [totalBufferMargin]="3"
            ></repos2-recycler>
        </div>

        <router-outlet></router-outlet>
    `
})
class RepoList implements OnInit {
    org: string;
    repos: Observable<Array<any>>;
    items: Array<any>;

    constructor(public github: Github, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.org = params['org'];
            if (this.org) {
                this.repos = this.github.getReposForOrg(this.org);
                this.repos.subscribe(items => {
                    this.items = items;
                })
            }
        });
    }
}

const ReposRecycler = getDynamicDomRecycler('repos-recycler', repoSelector);
const Repos2Recycler = getDynamicDomRecycler('repos2-recycler', repo2Selector);

export { RepoList };
export { ReposRecycler };
export { Repos2Recycler };
export { RepoContentItem };
export { Repo2ContentItem };
