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
    resumes: FirebaseListObservable<any>;

    progress_bar = -1;

    sendButtonClicked = false;

    selectedValueSpe: string;
    selectedValueYear: string;
    speOptions = [
        'No spé',
        'Info',
        'Maths',
        'Bio',
        'Chimie',
        'Meca',
        'Elec',
        'Archi',
        'Energétique',
        'Automatique',
        'Physique',
        'Autre'];
    years = ['1A', '2A', '3A', '4A', '5A', 'Autre'];

    urlResume: string;
    user: IUser;

    conditionChecked: boolean = false;

    file;
    arrayEmail: string[] = [];
    emailAlreadyPresent = false;


    filebuttoni(event) {
        this.imageuploaded = 'notSet';
        this.file = event.srcElement.files[0];
        this.progress_bar = 0.0;
    }

    uploadResume(file, user) {
        let uploader = document.getElementById('uploader');
        let date = new Date();
        this.path = 'resumes/' + file.name;
        this.storageref = this.storage.child(this.path);
        let task = this.storageref.put(file);
        let imageuploaded;
        let percentage;
        let set = false;
        let that = this;
        let size = file.size;
        if (size <= 5 * Math.pow(10, 6)) {
            task.on('state_changed',
                function progress(snapshot) {
                    percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    that.progress_bar = percentage.toFixed(2);
                }, function (error) {
                    that.toastService.show('Erreur lors de l\'envoie du CV ☹️');
                }, function (success) {
                    that.urlResume = task.snapshot.downloadURL;
                    that.user.urlResume = task.snapshot.downloadURL;
                    that.uploadUser(user);
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
        let that = this;
        this.uploadResume(this.file, this.user);
    }

    uploadUser(user) {
        this.firebaseService.uploadResume(user).then(done => {
            if (!done) {
                this.toastService.show('Problème lors de l\'envoi ! 👎🤕');
            } else {
                this.toastService.show('CV envoyé ! 👍');
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 1000);
            }
        });
    }

    emailUpdated(event) {
        let email = event.target.value;
        if (this.arrayEmail.indexOf(email) > -1) {
            this.emailAlreadyPresent = true;
        } else {
            this.emailAlreadyPresent = false;
        }
    }

    clearForm() {
        this.user = { name: '', surname: '', email: '', phoneNumber: '', urlResume: '', spe: '', year: '' };
    }

    createListEmails() {
        this.resumes.forEach(resumes => {
            for (let _i = 0; _i < resumes.length; _i++) {
                let email = resumes[_i].email;
                this.arrayEmail.push(email);
            }
        });
    }

    constructor(af: AngularFire, private toastService: ToastService, private firebaseService: FirebaseService,
        private router: Router) {
        this.storage = firebase.storage().ref();
        this.resumes = af.database.list('resumes');
        this.urlList = af.database.list('/images').map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        this.user = { name: '', surname: '', email: '', phoneNumber: '', urlResume: '', spe: '', year: '' };
        af.auth.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous,
        });
        this.createListEmails();
    }
}
