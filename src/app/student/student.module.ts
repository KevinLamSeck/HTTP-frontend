import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class StudentModule { }
