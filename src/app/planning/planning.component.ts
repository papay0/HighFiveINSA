import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html'
})
export class PlanningComponent {
    selectedIndex = 0;
    constructor(private router: Router) {}
}
