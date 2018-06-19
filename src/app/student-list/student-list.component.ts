import { Component, OnInit, EventEmitter } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  inputs: ['students'],
  outputs: ['selectstudent']
})
export class StudentListComponent implements OnInit {

  public selectstudent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(student: Student) {
    //console.log("emiting - onSelect");
    this.selectstudent.emit(student);
  }

}
