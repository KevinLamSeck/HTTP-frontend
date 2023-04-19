import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [
    NotFoundComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
