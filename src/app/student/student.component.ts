import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
                that.progress_bar = percentage;
                console.log(that.progress_bar);
        },
        // this.chk()
        );
    }
    chk() {
        this.interval = setInterval(() => {
        if (this.imageuploaded === 'notSet') {
            this.storageref = this.storage.child(this.path).getDownloadURL().then(url =>
            this.imageuploaded = url
            );
        } else {
            this.urlList.push({'path': this.path, 'image': this.imageuploaded});
            clearInterval(this.interval);
            this.resetFunction();
        }
        }, 500);
    }
    resetFunction() {
        document.getElementById('percentageprog').innerHTML = '';
        this.reset = false;
        setTimeout(() => {this.reset = true;}, 0);
    }

    onSubmit(event, name, familyName, phoneNumber, email, spe) {
        console.log('[submit] You submitted a value, name: ' + name + ', familyName: ' + familyName + ', phone number: ' + phoneNumber);
        console.log('[Submit] email: ' + email + ', spe: ' + this.selectedValue);
        this.sendButtonClicked = true;
        event.preventDefault();
    }

  constructor(af: AngularFire) {
        this.storage = firebase.storage().ref();
        this.urlList = af.database.list('/images').map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }
}
