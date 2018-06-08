import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Video } from './video';


import { Observable, Subject, pipe } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl = environment._getUrl;
  private _postUrl = environment._postUrl;
  private _putUrl = environment._putUrl;
  private _deleteUrl = environment._deleteUrl;

  constructor(private _http: Http) { }

  /*
  getVideos() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }
  */

  getVideos() {
    return this._http.get(this._getUrl)
      .pipe(
          //tap(console.log),
          map((response: Response) => response.json())
      );
  }

  addVideo(video: Video) {

    var payload = new FormData();

    payload.append("title", video.title);
    payload.append('description', video.description);
    payload.append('image', video.image);
    payload.append('url', video.url);
    payload.append('password', video.password);

    console.log('payload', payload) ;
    /*
    return this._http.post(this._postUrl, payload)
      .map((response: Response) => response.json());
    */
    return this._http.post(this._postUrl, payload)
      .pipe(
        //tap(console.log),
        map((response: Response) => response.json())  
      );
      
  }

  uvideo: Video = new Video();
  updateVideo(video: Video) {

    this.uvideo._id = video._id;
    this.uvideo.description = video.description;
    this.uvideo.title = video.title;
    this.uvideo.url = video.url;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    /*
    return this._http.put(this._putUrl + this.uvideo._id, JSON.stringify(this.uvideo), options)
      .map((response: Response) => response.json());
    */ 
    return this._http.put(this._putUrl + this.uvideo._id, JSON.stringify(this.uvideo), options)
      .pipe(
        map((response: Response) => response.json()) 
      );
  }

  deleteVideo(video: Video) {
  /*
    return this._http.delete(this._deleteUrl + video._id)
      .map((response: Response) => response.json());
  */
    return this._http.delete(this._deleteUrl + video._id)
     .pipe(
        map((response: Response) => response.json())
     );
     
  }

}



