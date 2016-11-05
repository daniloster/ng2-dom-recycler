import { Component, Input } from '@angular/core';
import { Person } from './person';

const selector = 'person-item';
@Component({
    selector,
    styles: [`
        .person {
            box-sizing: border-box;
            height: 35px;
            margin: 15px;
            border: 1px solid #f5f5f5;
            box-shadow: 3px 4px 10px #b3b3b3;
            color: #222;
        }

        .person .name {
            font-weight: 900;
            font-size: 13px;
            line-height: 16px;
            padding: 2px 5px;
        }

        .person .birth-year-message {
            color: #a9a9a9;
            font-size: 9px;
            line-height: 15px;
            padding: 0 5px;
        }
    `],
    template: `
        <div class="person">
            <div class="name">{{ item.name }}</div>
            <div class="birth-year-message">{{ item.getBirthYearMessage() }}</div>
        </div>
    `
})
class PersonItem {
    @Input() item: Person
}

export {PersonItem};
export {selector};
export default PersonItem;
