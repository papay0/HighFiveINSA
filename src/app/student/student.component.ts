import { Component } from '@angular/core';
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

    selectedValue: string;
    speOptions = ['Info', 'Bio', 'Elec'];

    urlResume: string;
    user: IUser;


    filebuttoni(event) {
        this.imageuploaded = 'notSet';
        let files = event.srcElement.files[0];
        let uploader = document.getElementById('uploader');
        let date = new Date();
        this.path = 'resumes/' + files.name + '(' + date + ')';
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

    onSubmit(event, name, surname, phoneNumber, email, spe) {
        this.user.name = name;
        this.user.surname = surname;
        this.user.phoneNumber = phoneNumber;
        this.user.email = email;
        this.user.spe = this.selectedValue;
        this.sendButtonClicked = true;
        event.preventDefault();

        this.firebaseService.uploadResume(this.user);
        console.log('Upload resume');
    }

  constructor(af: AngularFire, private toastService: ToastService, private firebaseService: FirebaseService) {
        this.storage = firebase.storage().ref();
        this.urlList = af.database.list('/images').map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        this.user = {name: '', surname: '', email: '', phoneNumber: '', urlResume: '', spe: ''};
    }
}
