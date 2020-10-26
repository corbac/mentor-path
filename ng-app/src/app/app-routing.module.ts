import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './container/home-page/home-page.component';
import { RoadmapViewPageComponent } from './container/roadmap-view-page/roadmap-view-page.component';


const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'roadmap/:title', component: RoadmapViewPageComponent },
  { path: 'roadmap/new', component: RoadmapViewPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
