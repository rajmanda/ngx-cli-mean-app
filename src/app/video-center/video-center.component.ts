import { VideoService } from './../video.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Video } from '../video';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  selectedVideo: Video;
  private hidenewVideo: boolean = true;
  videos: Array<Video>;


  selectedFile = null;

  constructor(private toastr: ToastrService,
      private _videoService: VideoService,
       
              ) { }

  
  ngOnInit() {
    this._videoService.getVideos()
      .subscribe(resVideoData => this.videos = resVideoData);
  }

  onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log('this.selectedFile', this.selectedFile);
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    console.log(this.selectedVideo);
  }

  newVideo() {
    this.hidenewVideo = false;
  }

  onSubmitAddVideo(video: Video) {
    console.log('this.selectedFile', this.selectedFile);

    if (this.selectedFile.size > (1024 * 1024 * 10)) {
      this.toastr.error('File size is too big - Please select an image less than 10 MB');
    }

    if (this.selectedFile.type != 'image/jpeg' &&
      this.selectedFile.type != 'image/jpg' &&
      this.selectedFile.type != 'image/png') {
      this.toastr.error('Wrong file type. Please Select image with .jpeg extension');
    }


    video.image = this.selectedFile;
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.hidenewVideo = true;
        this.selectedVideo = resNewVideo;
      });

  }

  onUpdateVideoEvent(video: any) {

    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  };

  onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        for (let i = 0; i < videoArray.length; i++) {
          if (videoArray[i]._id === video._id) {
            videoArray.splice(i, 1);
          }
        }
      });
    this.selectedVideo = null;
  };




}
