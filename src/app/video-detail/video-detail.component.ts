import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TemplateRef } from "@angular/core";
import { ConfirmPasswordComponent } from "src/app/confirm-password/confirm-password.component";
import { ConfirmPasswordServiceService } from "src/app/confirm-password-service.service";
import { OnChanges } from "@angular/core";
import { Video } from "src/app/video";
import { SimpleChanges } from "@angular/core";

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: ['video'],
  outputs: ['updateVideoEvent', 'deleteVideoEvent', 'updateFailedVideoEvent']
})
export class VideoDetailComponent implements OnInit , OnChanges {
  $scope: any;
  video: Video;
  videoCopy: Video;

  private editTitle: boolean = false;
  private updateVideoEvent = new EventEmitter();
  private deleteVideoEvent = new EventEmitter();
  private updateFailedVideoEvent = new EventEmitter();

  public  password: string;

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

  async updateVideo() {
    await this.confirmPasswordService.confirmPassword('Please confirm password to proeceed.')
    .then(response => {
      this.password = response.password;
      this.checkPasswordAndUpdate();
    }).catch(e => {
      this.toastr.warning('Password supplied is empty. Not updating.....');
      this.updateFailedVideoEvent.emit(this.video);
    });


    /*
    if (Error) {
      
      console.log('Error', Error);
      this.password = result.password;
      this.checkPasswordAndUpdate();
    }
    */
  }

  deleteVideo() {
    this.deleteVideoEvent.emit(this.video);
  }

  
  checkPasswordAndUpdate() {
    if(this.password === this.video.password) {
      this.toastr.success('Password matched. updating.....');
      this.updateVideoEvent.emit(this.video);
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
