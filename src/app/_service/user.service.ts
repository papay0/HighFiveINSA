import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class UserService {
    private loggedIn = false;
    public token: string;

    constructor(private http: Http, public af: AngularFire) {
        this.loggedIn = !!localStorage.getItem('loggedIn');
    }

    login(login, password) {
        return this.af.auth.login({
            email: `${login}@amicale-insat.fr`,
            password: password,
        }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        }).then(result => {
            this.loggedIn = true;
            localStorage.setItem('loggedIn', 'true');
            return !!result;
        }).catch(error => {
            this.loggedIn = false;
            return false;
        });
    }

    logout() {
        this.af.auth.logout();
        this.loggedIn = false;
        localStorage.removeItem('loggedIn');
    }

    isLoggedIn() {
        return this.loggedIn;
    }

}
