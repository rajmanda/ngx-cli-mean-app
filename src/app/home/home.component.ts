import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoService } from '../video.service.js';
import { Video } from '../video';
import { Slide } from '../slide';
import { setTheme } from 'ngx-bootstrap/utils';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(+90deg)' })),
      state('rotateCockwise', style({ transform: 'rotate(+90deg)' })),
      state('rotateAntiCockwise', style({ transform: 'rotate(-90deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class HomeComponent {

  title = 'app';
  videos: Array<Video>;
  slides = [];
  noWrapSlides = true;
  myInterval = 0;

  constructor(private _videoService: VideoService) {
    setTheme('bs4'); // or 'bs4'
  }

  ngOnInit() {
    this._videoService.getVideos()
      .subscribe(resVideoData => {
        this.videos = resVideoData;
        this.videos.forEach((item, index) => {
          let slide = new Slide();
          slide.image = item.image;
          this.slides.push(slide);
        });
      });
  }

  state: string = 'default';
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  rotateClockwise() {
    this.state = (this.state === 'default' ? 'rotateCockwise' : 'default');
  }
  rotateAntiClockwise() {
    this.state = (this.state === 'default' ? 'rotateAntiCockwise' : 'default');
  }

  log(event: number) {
    this.state = 'default'
    console.log("slide chaged");

  }

  slideshow() {
     
    if (this.noWrapSlides) {
      console.log('starting slide show');
      this.noWrapSlides = false;
      this.myInterval = 5000;
    } else {
      console.log('stopping slide show');
      this.noWrapSlides = true;
      this.myInterval = 0;
    }

  }

}
