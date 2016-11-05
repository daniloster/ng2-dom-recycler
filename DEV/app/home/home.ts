import { Component } from '@angular/core';
import { getPeople } from '../about/about';

@Component({
    selector: 'home',
    styleUrls: ['./home.css'],
    template: `
    <h3>Home Component</h3>
    <p>Welcome to Angular Seed</p>

    <div *ngFor="let person of people" class="content-item">
        <person-item [item]="person"></person-item>
    </div>
  `
})
export class Home {
    people: Array<Object>
    constructor() {
        this.people = getPeople(100000)
    }
}
