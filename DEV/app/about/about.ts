import { Component } from '@angular/core';
import { Person } from './person';
import { PersonItem, selector } from './person-item';
import { getDynamicDomRecycler } from '../../../src/dom.recycler';

const names = [
    'Mary', 'John', 'Son', 'Father', 'Mother', 'Daughter',
    'Sister', 'Snow', 'Stark', 'Winter', 'Is Coming', 'Love',
    'Peace', 'Maker', 'Happiness', 'Learning', 'Sun', 'Moon'
];
function getName() {
    let idxFirst = Math.floor(Math.random() * 100000) % names.length;
    let idxSecond = Math.floor(Math.random() * 398772) % names.length;
    return [names[idxFirst], names[idxSecond]].join(' ');
}
function getPeople(totalPeople): Array<Object> {
    const people = [];
    for (let idx = 0, len = totalPeople; idx < len; idx++) {
        let person = {
            name: getName(),
            age: idx % 60,
            getBirthYearMessage: () => {
                const birthYear = new Date().getFullYear() - person.age;
                return `I born in ${birthYear}!`;
            }
        };
        people.push(person);
    }
    return people;
}
const people: Array<Object> = getPeople(100000);


const PeopleRecycled = getDynamicDomRecycler('people-recycled', selector);

@Component({
    selector: 'about',
    styles: [`
        .people-container {
            height: 400px;
        }
    `],
    template: `
        <h3>About Component</h3>
        <p>This is the about component!</p>
        <h4>People</h4>
        <div *ngIf="!!people" class="people-container">
            <people-recycled
                [items]="people"
                [itemHeight]="65"
                [totalBufferMargin]="3"
            ></people-recycled>
        </div>
    `
})
export class About {
    people: Array<Object>;
    constructor() {
        this.people = people;
    }
}

export {getPeople};
export {PeopleRecycled};
export {PersonItem};

