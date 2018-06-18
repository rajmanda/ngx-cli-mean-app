import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from "ngx-bootstrap";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent  {

  message: string;
  password: Subject<String> = new Subject<String>();
  //err: {message: string };

  constructor(private modalRef: BsModalRef) { }

  confirmPass(password: any): void {
    //console.log("password.length", password.password.length);
    if (password.password.length == 0 ) {
      this.password.error("Opps - password cannot be empty");
      this.modalRef.hide();
    } else {
      this.password.next(password);
      this.modalRef.hide();
    }

  }
  decline(): void {
    this.modalRef.hide();
  }

}
