import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/observable';
import { ToastService } from '../_service/toast.service';

@Injectable()
export class FirebaseService {

    uploadResume(student) {
        let path = this.af.database.list('resumes/');
        return path.push(student).then( success => {
            return true;
        }).catch(error => false);
    }


    constructor(
        private af: AngularFire,
        private toastService: ToastService
    ) {}
}
