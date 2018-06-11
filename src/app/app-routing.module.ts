import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { VideoCenterComponent } from "./video-center/video-center.component";

const routes: Routes = [
  { path: 'videoCenter', component: VideoCenterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'videoCenter', component: VideoCenterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []

})
export class AppRoutingModule { }
