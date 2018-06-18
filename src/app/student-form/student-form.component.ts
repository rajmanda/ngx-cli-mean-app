import { Component, OnInit } from '@angular/core';
import { Student } from "src/app/student";
import { ConfirmPasswordServiceService } from "src/app/confirm-password-service.service";


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  

  constructor(private confirmPasswordService: ConfirmPasswordServiceService) { }

  model = new Student('Dr IQ', 'LHPS', 'C:\\Users\\RManda\\Downloads\\raj&Mahaan-snowboard.jpeg', 'pass123', 'Chess champion', '');
  submitted = false;

  ngOnInit() {
    console.log('model', this.model);
  }

  async onSubmit() {
    const result = await this.confirmPasswordService.confirmPassword('Please give students password');
    if (result) {
      console.log('Yeahhhhhh!');
      console.log('result', result.password);
    }
    this.submitted = true;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


}
