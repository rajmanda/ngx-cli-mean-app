import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Student } from './student';

import { Observable, Subject, pipe } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _getUrl = environment._getUrl;
  private _postUrl = environment._postUrl;
  private _putUrl = environment._putUrl;
  private _deleteUrl = environment._deleteUrl;

  constructor(private _http: Http) { }

  /*
  getstudents() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }
  */

  getStudents() {
    return this._http.get(this._getUrl)
      .pipe(
      //tap(console.log),
      map((response: Response) => response.json())
      );
  }

  addStudent(student: Student) {

    var payload = new FormData();

    payload.append("name", student.name);
    payload.append('achievement', student.achievement);
    payload.append('image', student.image);
    payload.append('school', student.school);
    payload.append('password', student.password);

    console.log('payload', payload);
    /*
    return this._http.post(this._postUrl, payload)
      .map((response: Response) => response.json());
    */
    return this._http.post(this._postUrl, payload)
      .pipe(
      //tap(console.log),
      map((response: Response) => response.json())
      );

  }

  ustudent: Student = new Student();
  updateStudent(student: Student) {

    this.ustudent._id = student._id;
    this.ustudent.achievement = student.achievement;
    this.ustudent.name = student.name;
    this.ustudent.school = student.school;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    /*
    return this._http.put(this._putUrl + this.ustudent._id, JSON.stringify(this.ustudent), options)
      .map((response: Response) => response.json());
    */
    return this._http.put(this._putUrl + this.ustudent._id, JSON.stringify(this.ustudent), options)
      .pipe(
      map((response: Response) => response.json())
      );
  }

  deleteStudent(student: Student) {
    /*
      return this._http.delete(this._deleteUrl + student._id)
        .map((response: Response) => response.json());
    */
    return this._http.delete(this._deleteUrl + student._id)
      .pipe(
      map((response: Response) => response.json())
      );

  }

}



