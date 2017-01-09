import { Component, Input } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { ToastService } from '../_service/toast.service';
import { FirebaseService } from '../_service/firebase.service';
import { IUser } from '../_model/user.model';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styles: [`
        md-card {
            margin: 20px;
        }
    `]
})
export class CompanyComponent {

    resumes: FirebaseListObservable<any>;
    speOptions = ['Toutes', 'Info', 'Bio', 'Elec'];
    checkBoxSpe = [];

    updateCheckedOptions(index, event) {
        if (index === 0) {
            for (let _i = 0; _i < this.speOptions.length; _i++) {
                this.checkBoxSpe[_i] = event.checked;
            }
        } else {
            this.checkBoxSpe[index] = event.checked;
        }
    }

    checkedOptions() {
        let checkOptions = [];
        for (let _i = 0; _i < this.speOptions.length; _i++) {
            if (this.checkBoxSpe[_i]) {
                checkOptions.push(this.speOptions[_i]);
            }
        }
        return checkOptions;
    }

    constructor(af: AngularFire, private toastService: ToastService, private firebaseService: FirebaseService) {
        this.resumes = af.database.list('resumes');
        for (let _i = 0; _i < this.speOptions.length; _i++) {
            this.checkBoxSpe.push(true);
        }
    }

    /*
        <pdf-viewer [src]="{url: resume.urlResume, withCredentials: true}" 
              [page]="page" 
              [zoom]="3"
              [original-size]="false" 
              style="display: block;">
    </pdf-viewer>
    */
}