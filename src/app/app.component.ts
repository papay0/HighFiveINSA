import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  window: Window;
  urlGitHub: string = 'https://github.com/papay0/HighFiveINSA';

  goGitHub(): void {
    window.open(this.urlGitHub);
  }
}
