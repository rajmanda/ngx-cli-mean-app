import { Injectable } from '@angular/core';
import { BsModalService } from "ngx-bootstrap";
import { ConfirmPasswordComponent } from "src/app/confirm-password/confirm-password.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmPasswordServiceService {

  constructor(private bsModalService: BsModalService) { }

  confirmPassword(message: string): Promise<any> {
    const modal = this.bsModalService.show(ConfirmPasswordComponent, { initialState: { message: message } });
    return new Promise<any>((resolve, reject) => modal.content.password.subscribe((result) => resolve(result)));
  }
}
