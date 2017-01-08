import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/observable';
import { ToastService } from '../_service/toast.service';

@Injectable()
export class FirebaseService {

    uploadResume(student): void {
        let path = this.af.database.list('resumes/');
        path.push(student).then( success => {
            this.toastService.show('CV envoyé ! 👍');
        });
    }


    constructor(
        private af: AngularFire,
        private toastService: ToastService
    ) {}
}
