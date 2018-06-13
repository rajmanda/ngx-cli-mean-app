import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap';
import { BsModalService } from "ngx-bootstrap";
import { TemplateRef } from "@angular/core";
import { ConfirmPasswordComponent } from "src/app/confirm-password/confirm-password.component";
import { ConfirmPasswordServiceService } from "src/app/confirm-password-service.service";

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: ['video'],
  outputs: ['updateVideoEvent', 'deleteVideoEvent']
})
export class VideoDetailComponent implements OnInit {
  video: any;

  private editTitle: boolean = false;
  private updateVideoEvent = new EventEmitter();
  private deleteVideoEvent = new EventEmitter();
  public  bsModalRef: BsModalRef;
  public  password: string;

  constructor(
        private toastr: ToastrService,
        private modalService: BsModalService,
        private confirmPasswordService: ConfirmPasswordServiceService
    ) { }

  ngOnInit() {
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  async updateVideo() {
    const result = await this.confirmPasswordService.confirmPassword('Please confirm password to proeceed.');
    if (result) {
      console.log('Yeahhhhhh!');
      console.log('result', result.password);
      this.password = result.password;
      this.checkPasswordAndUpdate();
    }
    
   
  }

  deleteVideo() {
    this.deleteVideoEvent.emit(this.video);
  }

  
  checkPasswordAndUpdate() {
    if(this.password === this.video.password) {
      this.toastr.success('Password matched. updating.....');
      this.updateVideoEvent.emit(this.video);
    }else{
      this.toastr.error("Password doesn't match - try again....");
    }
  }

}
