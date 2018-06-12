import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap';
import { BsModalService } from "ngx-bootstrap";
//import { ConfirmPasswordModaConfirmPasswordModalComponentlComponent } from '../confirm-password-modal/confirm-password-modal.component';
import { TemplateRef } from "@angular/core";

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
  
  constructor(
        private toastr: ToastrService,
        private modalService: BsModalService
    ) { }

  ngOnInit() {
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateVideo() {
    console.log("trying to show popup");    
  }

  deleteVideo() {
    this.deleteVideoEvent.emit(this.video);
  }

  password:string;
  checkPassword(){
    if(this.password === this.video.password) {
      this.toastr.success('Password matched. updating.....');
      this.updateVideoEvent.emit(this.video);
    }else{
      this.toastr.error("Password doesn't match - try again....");
    }
  }


  public bsModalRef: BsModalRef;
  /*
  openConfirmDialog() {
      this.modalRef = this.modalService.show(ConfirmPasswordModalComponent);
      //this.modalRef.content.onClose.subscribe(result => {
      //    console.log('results', result);
      //})
  }
  */
  openConfirmDialog() {
      this.bsModalRef = this.modalService.show(ConfirmPasswordModalComponent, { class: 'modal-sm'  });
  }


}
