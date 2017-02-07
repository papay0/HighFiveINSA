import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_service/user.service';
import { RoutingService } from '../_service/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginError: boolean = false;
  loginErrorMessage: string = 'Invalide login or password!';
  onSubmit(event, login, password) {
    event.preventDefault();

    this.userService.login(login, password).then((result) => {
      if (result) {
        this.router.navigate([this.routingService.getLandingPage()]);
      } else {
        this.loginError = true;
      }
    });
    
  }
  constructor(private userService: UserService, private router: Router, private routingService: RoutingService) { }
}
