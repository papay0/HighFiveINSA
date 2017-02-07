import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent }  from './login/login.component';
import { StudentComponent } from './student/student.component';
import { CompanyComponent } from './company/company.component';
import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'student',  component: StudentComponent },
  { path: 'company',  component: CompanyComponent, canActivate: [LoggedInGuard]},
  { path: 'login',  component: LoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
