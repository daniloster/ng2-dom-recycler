import { ViewRef, Component, OnInit, Input, Output, Injectable } from '@angular/core';
import { Github } from '../shared/github';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { getDynamicDomRecycler } from '../../../../src/dom.recycler';

interface Repo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
}

@Component({
    selector: 'repo-content-item',
    styles: [`
        .repo-content {
            height: 115px;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
    `],
    template: `
        <div class="repo-content">
            <h3>{{ item.full_name }}</h3>
            <div>{{ item.id }}</div>
            <div>{{ item.name }}</div>
            <div>{{ item.private }}</div>
        </div>
    `
})
class RepoComponent {
    @Input() item: Repo
}

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
                [totalBufferMargin]="5"
            ></repos-recycler>
        </div>

        <router-outlet></router-outlet>
    `,
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

const ReposRecycler = getDynamicDomRecycler('repos-recycler', 'repo-content-item');

export { RepoList };
export { ReposRecycler };
export { RepoComponent };
