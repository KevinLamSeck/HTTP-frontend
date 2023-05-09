import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediasModule } from '../medias/medias.module';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CourseSVGComponent } from '../shared/svg/course-svg/course-svg.component';
import { MediaSVGComponent } from '../shared/svg/media-svg/media-svg.component';
import { ModuleSVGComponent } from '../shared/svg/module-svg/module-svg.component';
import { TileComponent } from './components/tile/tile.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ConceptorComponent } from './pages/conceptor/conceptor.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { StudentComponent } from './pages/student/student.component';
import { MobileActionsConceptorComponent } from './components/mobile-actions-conceptor/mobile-actions-conceptor.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ConceptorComponent,
    StudentComponent,
    ManagerComponent,
    TileComponent,
    BreadcrumbComponent,
    MobileActionsConceptorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MediasModule,
    DashboardRoutingModule
  ],
  exports: [
  ]
})
export class DashboardModule { }
