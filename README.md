## ng2-dom-recycler

This project has been built based on https://github.com/angular/angular2-seed. Dom recycler is a component that 
provide highest performance while rendering massive list of objects. Basically, it defines a viewport based on the outer
container which defines the bounds of the scroll manager. The maximum number of element that may be render is 
(totalFitsViewport + 2 * totalBufferMargin).
In the first time, when the component is loaded, the recycler assumes the worst case (viewport is the full height available).
After scroll event has been dispatched, the recycler manager calculates its real height, then, re-slice the items into the 
new viewport adding buffer top and bottom when it is possible.

[Complexities of an Infinite Scroller](https://developers.google.com/web/updates/2016/07/infinite-scroller)

*Pending*: Add diagram explaining. 

### Consuming
#### require
var getDynamicDomRecycler = require('ng2-dom-recycler');
#### es6 - 1
import getDynamicDomRecycler from 'ng2-dom-recycler';
#### es6 - 2
import { getDynamicDomRecycler } from 'ng2-dom-recycler';
#### global/window
var getDynamicDomRecycler = window.ng2DomRecycler;

### Usage
Here is an example of how to use it in a project TypeScript. This code might be found in the DEV folder once you get this repo.

```
import { ViewRef, Component, OnInit, Input } from '@angular/core';
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

```

*NOTE*: All the elements exported must be added to your module making angular able to resolve the dependency injection.
```
@NgModule({
  declarations: [RepoList, ReposRecycler, RepoComponent],
  imports     : [...],
  providers   : [...],
  bootstrap   : [...]
})
export class AppModule {

}
```

### Next steps
* Add to npm
* Create a showcase comparison

### Running this project
* Clone this project
* In your terminal, go to your project's folder
* Execute "npm install"
* Then, "npm start"
* Access [http://localhost:3000/](http://localhost:3000/)