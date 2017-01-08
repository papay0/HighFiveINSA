import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToastService } from '../_service/toast.service';

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
    progress_bar_done = false;

    sendButtonClicked = false;

    selectedValue: string;
    speOptions = ['Info', 'Bio', 'Elec'];


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
        task.on('state_changed',
            function progress(snapshot){
                percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // this.progress_bar = percentage / 100;
                // document.getElementById('percentageprog').innerHTML = percentage;
                // console.log(percentage);
                that.progress_bar = percentage.toFixed(2);
                if (percentage === 100) { // If 100% and sendButtonClicked then 
                    that.progress_bar_done = true;
                    if (that.sendButtonClicked) {
                        that.toastService.show('CV envoyé !');
                    }
                }

                console.log(that.progress_bar);
            },
        );
    }

    onSubmit(event, name, familyName, phoneNumber, email, spe) {
        console.log('[submit] You submitted a value, name: ' + name + ', familyName: ' + familyName + ', phone number: ' + phoneNumber);
        console.log('[Submit] email: ' + email + ', spe: ' + this.selectedValue);
        this.sendButtonClicked = true;
        event.preventDefault();
        if (this.progress_bar_done) {
            this.toastService.show('CV envoyé !');
        }
    }

  constructor(af: AngularFire, private toastService: ToastService) {
        this.storage = firebase.storage().ref();
        this.urlList = af.database.list('/images').map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }
}
