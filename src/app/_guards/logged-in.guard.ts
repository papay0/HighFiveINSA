import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_service/user.service';
import { RoutingService } from '../_service/routing.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: UserService, private router: Router, private routingService: RoutingService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.user.isLoggedIn()) {
        console.log('user is logged in');
        return true;
    }
    this.routingService.setLandingPage('/' + route.url.join('/'));

    this.router.navigate(['/login']);
    return false;
  }
}
