import { StudentService } from './../student.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Student } from '../student';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-student-center',
  templateUrl: './student-center.component.html',
  styleUrls: ['./student-center.component.css']
})
export class StudentCenterComponent implements OnInit {

  selectedStudent: Student;
  private hidenewStudent: boolean = true;
  students: Array<Student>;


  selectedFile = null;

  constructor(private toastr: ToastrService,
    private _studentService: StudentService,

  ) { }


  ngOnInit() {
    this._studentService.getStudents()
      .subscribe(resstudentData => this.students = resstudentData);
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log('this.selectedFile', this.selectedFile);
  }

  onSelectstudent(student: any) {
    console.log("caught onSelectstudent event", student);
    this.selectedStudent = student;
  }

  onUpdateFailedstudentEvent(student: any) {
    this._studentService.getStudents()
      .subscribe(resstudentData => {
        this.students = resstudentData;
        let studentArray = this.students;
        for (let i = 0; i < studentArray.length; i++) {
          if (studentArray[i]._id === student._id) {
            this.onSelectstudent(studentArray[i]);
          }
        }
      });

  }

  newstudent() {
    this.hidenewStudent = false;
  }

  onSubmitAddStudent(student: Student) {
    console.log('adding Stundet', student);
    console.log('this.selectedFile', this.selectedFile);

    if (this.selectedFile.size > (1024 * 1024 * 10)) {
      this.toastr.error('File size is too big - Please select an image less than 10 MB');
    }

    if (this.selectedFile.type != 'image/jpeg' &&
      this.selectedFile.type != 'image/jpg' &&
      this.selectedFile.type != 'image/png') {
      this.toastr.error('Wrong file type. Please Select image with .jpeg extension');
    }


    student.image = this.selectedFile;
    this._studentService.addStudent(student)
      .subscribe(resNewstudent => {
        this.students.push(resNewstudent);
        this.hidenewStudent = true;
        this.selectedStudent = resNewstudent;
      });

  }

  onUpdateStudentEvent(student: any) {

    this._studentService.updateStudent(student)
      .subscribe(resUpdatedStudent => student = resUpdatedStudent);
    this.selectedStudent = student;
  };

  onDeleteStudentEvent(student: any) {
    let studentArray = this.students;
    this._studentService.deleteStudent(student)
      .subscribe(resDeletedStudent => {
        for (let i = 0; i < studentArray.length; i++) {
          if (studentArray[i]._id === student._id) {
            studentArray.splice(i, 1);
          }
        }
      });
    this.selectedStudent = null;
  };




}
