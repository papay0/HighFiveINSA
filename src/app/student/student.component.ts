import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { ToastService } from '../_service/toast.service';
import { FirebaseService } from '../_service/firebase.service';
import { IUser } from '../_model/user.model';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styles: [`
        md-card {
            margin: 20px;
        }
        .file-over { border: dotted 3px red; }
        .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }
    `]
})
export class StudentComponent {
    percentage: number;
    imageuploaded = 'notSet';
    url: boolean = false;
    interval;
    storageref;
    storage;
    path;
    displaypic;
    selected: boolean = false;
    prog;
    reset: boolean = true;
    urlList: FirebaseListObservable<any[]>;

    progress_bar = 0;

    sendButtonClicked = false;

    selectedValueSpe: string;
    selectedValueYear: string;
    speOptions = ['No Spé', 'Info', 'Bio', 'Elec'];
    years = ['1A', '2A', '3A', '4A', '5A', 'Autre'];

    urlResume: string;
    user: IUser;

    conditionChecked: boolean = false;


    filebuttoni(event) {
        this.imageuploaded = 'notSet';
        let files = event.srcElement.files[0];
        let uploader = document.getElementById('uploader');
        let date = new Date();
        this.path = 'resumes/' + '(' + date + ')' + files.name;
        this.storageref = this.storage.child(this.path);
        let task = this.storageref.put(files);
        let imageuploaded;
        let percentage;
        let set = false;
        let that = this;
        let size = files.size;
        if (size <= 5 * Math.pow(10, 6)) {
            task.on('state_changed',
            function progress(snapshot){
                percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                that.progress_bar = percentage.toFixed(2);
                // console.log(that.progress_bar);
            }, function (error) {
                console.log('Error: ' + error);
                that.toastService.show('Erreur lors de l\'envoie du CV ☹️');
            }, function (success) {
                that.urlResume = task.snapshot.downloadURL;
                that.user.urlResume = task.snapshot.downloadURL;
            }
        );
        } else {
            this.toastService.show('Fichier trop volumineux 🐳');
        }
    }

    onSubmit(event, name, surname, phoneNumber, email, spe, year) {
        this.user.name = name;
        this.user.surname = surname;
        this.user.phoneNumber = phoneNumber;
        this.user.email = email;
        this.user.spe = this.selectedValueSpe;
        this.user.year = this.selectedValueYear;
        this.sendButtonClicked = true;
        event.preventDefault();

        this.firebaseService.uploadResume(this.user).then(done => {
            if (!done) {
                this.toastService.show('Problème lors de l\'envoi ! 👎🤕');
            } else {
                this.toastService.show('CV envoyé ! 👍');
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 500);
            }
        });
    }

    clearForm() {
        this.user = {name: '', surname: '', email: '', phoneNumber: '', urlResume: '', spe: '', year: ''};
    }

  constructor(af: AngularFire, private toastService: ToastService, private firebaseService: FirebaseService,
    private router: Router) {
        this.storage = firebase.storage().ref();
        this.urlList = af.database.list('/images').map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        this.user = {name: '', surname: '', email: '', phoneNumber: '', urlResume: '', spe: '', year: ''};
        af.auth.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous,
        });
    }
}
