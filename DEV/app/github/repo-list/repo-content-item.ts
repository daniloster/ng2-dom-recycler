import { Component, Input } from '@angular/core';
import { Repo } from './repo';

const selector = 'repo-content-item';
@Component({
    selector,
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
class RepoContentItem {
    @Input() item: Repo
}

export {RepoContentItem, selector};
export default RepoContentItem;
