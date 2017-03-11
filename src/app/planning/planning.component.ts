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
            {description: 'Ouverture du village', date: '06/04/2017', location: 'Toulouse', timeTable: '14h00'},
            {description: 'Arrivée des participants', date: '06/04/2017', location: 'Toulouse', timeTable: '17h-23h'},
            {description: 'Début de la soirée', date: '06/04/2017', location: 'Toulouse', timeTable: '22h00'},
            {description: 'Fin de la Soirée', date: '06/04/2017', location: 'Toulouse', timeTable: '1h00'}
        ],
        [
            {description: 'Arrivée du bus de Rouen', date: '07/04/2017', location: 'Toulouse', timeTable: '6h00'},
            {description: 'Réveil', date: '07/04/2017', location: 'Toulouse', timeTable: '7h00'},
            {description: 'Petit déjeuner des participants', date: '07/04/2017', location: 'Toulouse', timeTable: '7h00-8h45'},
            {description: 'Ouverture du village', date: '07/04/2017', location: 'Toulouse', timeTable: '08h00'},
            {description: 'Parade', date: '07/04/2017', location: 'Toulouse', timeTable: '8h45'},
            {description: 'Début des sports', date: '07/04/2017', location: 'Toulouse', timeTable: '9h00'},
            {description: 'Repas', date: '07/04/2017', location: 'Toulouse', timeTable: '12h00-14h00'},
            {description: 'Show des pompoms (5minutes)', date: '07/04/2017', location: 'Toulouse', timeTable: '18h00'},
            {description: 'Talent show', date: '07/04/2017', location: 'Toulouse', timeTable: '18h10'},
            {description: 'Début du service repas (RU)', date: '07/04/2017', location: 'Toulouse', timeTable: '19h00'},
            {description: 'Fin du service repas', date: '07/04/2017', location: 'Toulouse', timeTable: '20h00'},
            {description: 'Fin du village', date: '07/04/2017', location: 'Toulouse', timeTable: '21h00'},
            {description: 'Fermeture du RU & Début de la soirée', date: '07/04/2017', location: 'Toulouse', timeTable: '22h00'},
            {description: 'Fin de la soirée', date: '07/04/2017', location: 'Toulouse', timeTable: '2h00'}
        ],
        [
            {description: 'Réveil', date: '08/04/2017', location: 'Toulouse', timeTable: '07h00'},
            {description: 'Petit déjeuner des participants', date: '08/04/2017', location: 'Toulouse', timeTable: '7h00-8h45'},
            {description: 'Ouverture du village', date: '08/04/2017', location: 'Toulouse', timeTable: '08h00'},
            {description: 'Début des sports', date: '08/04/2017', location: 'Toulouse', timeTable: '09h00'},
            {description: 'Repas', date: '08/04/2017', location: 'Toulouse', timeTable: '12h00-14h00'},
            {description: 'Compète des pompoms', date: '08/04/2017', location: 'Toulouse', timeTable: '17h00'},
            {description: 'Remise des prix', date: '08/04/2017', location: 'Toulouse', timeTable: '18h00'},
            {description: 'Début du service repas (RU)', date: '08/04/2017', location: 'Toulouse', timeTable: '19h00'},
            {description: 'Fin du service repas', date: '08/04/2017', location: 'Toulouse', timeTable: '20h00'},
            {description: 'Fin du village', date: '08/04/2017', location: 'Toulouse', timeTable: '21h00'},
            {description: 'Fermeture du RU & Début de la soirée', date: '08/04/2017', location: 'Toulouse', timeTable: '22h00'},
            {description: 'Fin de la soirée', date: '08/04/2017', location: 'Toulouse', timeTable: '05h00'}
        ]
    ];
    constructor() {}
}

        /*
7h: Réveil
7h-8h45: Petit déjeuner des participants
8h: Ouverture du village
9h: Début des sports
12h-14h: Repas
17h: Compète des pompoms
18h: Remise des prix
19h: Début du service repas (RU)
20h: Fin du service repas
21h: Fin du village
22h: Fermeture du RU
22h: Début de la soirée
5h: Fin de la soirée
        */