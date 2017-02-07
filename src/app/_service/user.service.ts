import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class UserService {
    private loggedIn = false;
    public token: string;

    constructor(private http: Http) {
        this.loggedIn = !!localStorage.getItem('loggedIn');
    }

    login(login, password) {
        if (login === 'a' && password === 'z') {
            localStorage.setItem('loggedIn', 'true');
            this.loggedIn = true;
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('loggedIn');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

}
