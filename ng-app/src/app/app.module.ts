import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoadmapBuilderComponent } from './roadmap-builder/roadmap-builder.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { RoadmapSidePageComponent } from './roadmap-side-page/roadmap-side-page.component';
import { HomePageComponent } from './container/home-page/home-page.component';
import { RoadmapViewPageComponent } from './container/roadmap-view-page/roadmap-view-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RoadmapBuilderComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    SearchEngineComponent,
    RoadmapSidePageComponent,
    HomePageComponent,
    RoadmapViewPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
