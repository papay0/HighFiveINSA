import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';

// Components
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlanningComponent } from './planning/planning.component';
import { StudentComponent } from './student/student.component';
import { CompanyComponent } from './company/company.component';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Services
import { ToastService } from './_service/toast.service';
import { FirebaseService } from './_service/firebase.service';
import { UserService } from './_service/user.service';
import { RoutingService } from './_service/routing.service';

// Pipes
import { MyFilterResumePipe } from './_pipe/filter-resume.pipe';

// Guards
import { LoggedInGuard } from './_guards/logged-in.guard';

export const  firebaseConfig = {
    apiKey: 'AIzaSyCz-zIiaaA73DIdlpOeavfSIomygIipjMk',
    authDomain: 'highfiveinsa-24c10.firebaseapp.com',
    databaseURL: 'https://highfiveinsa-24c10.firebaseio.com',
    storageBucket: 'highfiveinsa-24c10.appspot.com',
    messagingSenderId: '606256778486'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlanningComponent,
    StudentComponent,
    LoginComponent,
    CompanyComponent,
    PdfViewerComponent,
    MyFilterResumePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ToastService, FirebaseService, UserService, RoutingService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
