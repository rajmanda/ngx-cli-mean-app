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

  constructor(private modalRef: BsModalRef) { }

  confirmPass(password: String): void {
    this.password.next(password);
    this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }

}
