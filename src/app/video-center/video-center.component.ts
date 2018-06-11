import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {
  constructor(private toastr: ToastrService) { }
  title: String = "VideoCenterComponent";

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit() {
  }
}
