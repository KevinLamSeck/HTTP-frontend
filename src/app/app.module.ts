import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { StudentModule } from './student/student.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ModulesModule,
    DashboardModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
