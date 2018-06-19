import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { StudentFormComponent } from "src/app/student-form/student-form.component";
import { StudentCenterComponent } from './student-center/student-center.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'students', component: StudentCenterComponent },
  { path: 'student', component: StudentFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profiles', component: StudentCenterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []

})
export class AppRoutingModule { }
