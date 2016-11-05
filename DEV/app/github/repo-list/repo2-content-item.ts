import { Component, Input } from '@angular/core';
import { Repo } from './repo';

const selector = 'repo2-content-item';
@Component({
    selector,
    styles: [`
        .repo2-content {
            height: 30px;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        .repo2-content h3 {
            line-height: 22px;
            padding: 4px 0;
            margin: 0;
        }
    `],
    template: `
        <div class="repo2-content">
            <h3>{{ item.full_name }}</h3>
        </div>
    `
})
class Repo2ContentItem {
    @Input() item: Repo
}

export {Repo2ContentItem, selector};
export default Repo2ContentItem;