import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './_service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  window: Window;
  urlGitHub: string = 'https://github.com/papay0/HighFiveINSA';
  urlTwitter: string = 'https://twitter.com/papay0';

  goGitHub(): void {
    window.open(this.urlGitHub);
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }

  constructor(private userService: UserService, private router: Router) { }
}
