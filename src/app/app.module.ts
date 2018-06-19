  import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';


import { SafePipe } from './safe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentCenterComponent } from './student-center/student-center.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SafePipe,
    ConfirmPasswordComponent,
    StudentFormComponent,
    StudentCenterComponent,
    StudentDetailComponent,
    StudentListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmPasswordComponent],
})
export class AppModule { }
