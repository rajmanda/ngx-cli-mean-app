import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TemplateRef } from "@angular/core";
import { ConfirmPasswordComponent } from "src/app/confirm-password/confirm-password.component";
import { ConfirmPasswordServiceService } from "src/app/confirm-password-service.service";
import { OnChanges } from "@angular/core";
import { Student } from '../student';
import { SimpleChanges } from "@angular/core";

@Component({
  selector: 'student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  inputs: ['student'],
  outputs: ['updateStudentEvent', 'deleteStudentEvent', 'updateFailedStudentEvent']
})
export class StudentDetailComponent implements OnInit, OnChanges {
  $scope: any;
  student: Student;

  private editTitle: boolean = false;
  private updateStudentEvent = new EventEmitter();
  private deleteStudentEvent = new EventEmitter();
  private updateFailedStudentEvent = new EventEmitter();

  public password: string;

  constructor(
    private toastr: ToastrService,
    private confirmPasswordService: ConfirmPasswordServiceService
  ) { }

  ngOnInit() {

  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  async updateStudent() {
    await this.confirmPasswordService.confirmPassword('Please confirm password to proeceed.')
      .then(response => {
        this.password = response.password;
        this.checkPasswordAndUpdate();
      }).catch(e => {
        this.toastr.warning('Password supplied is empty. Not updating.....');
        this.updateFailedStudentEvent.emit(this.student);
      });


    /*
    if (Error) {
      
      console.log('Error', Error);
      this.password = result.password;
      this.checkPasswordAndUpdate();
    }
    */
  }

  deleteStudent() {
    this.deleteStudentEvent.emit(this.student);
  }


  checkPasswordAndUpdate() {
    if (this.password === this.student.password) {
      this.toastr.success('Password matched. updating.....');
      this.updateStudentEvent.emit(this.student);
    } else {

      this.toastr.error("Password doesn't match - try again....");
      //console.log("back - copying videoCopy", this.videoCopy);

      //console.log("back - copying video", this.video);
      /*
      this.updateFailedVideoEvent.emit(this.video);
      this.$scope.$watch('this.video', (newValue, oldValue) => {

        //this.resetUiCheck(newValue, oldValue)
        console.log('oldValue', oldValue);
        console.log('newValue', newValue);
        }
      );
      */
    }
  }
}
