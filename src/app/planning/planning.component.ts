import { Component } from '@angular/core';

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styles: [`
		md-card {
		    margin: 8px;
		}
		md-card-content {
		    padding-left: 10px;
		}
	`]
})
export class PlanningComponent {
    selectedIndex = 0;
    schedules = [
        [
            {description: 'Arrivée des participants', date: '06/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'Arrivée des participants', date: '06/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'Arrivée des participants', date: '06/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'Arrivée des participants', date: '06/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'}
        ],
        [
            {description: 'Blablabla', date: '07/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'Blablabla', date: '07/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'Blablabla', date: '07/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'Blablabla', date: '07/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'}
        ],
        [
            {description: 'A remplir', date: '08/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'A remplir', date: '08/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'A remplir', date: '08/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'},
            {description: 'A remplir', date: '08/04/2017', location: 'Toulouse', timeTable: '08h00-09h30'}
        ]
    ];
    constructor() {}
}
