import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../dashboard/guards/role.guard';
import { CreateMediaComponent } from './pages/create-media/create-media.component';
import { ListMediaComponent } from './pages/list-media/list-media.component';
import { UpdateMediaComponent } from './pages/update-media/update-media.component';
import { ViewMediaComponent } from './pages/view-media/view-media.component';

@NgModule({
  imports: [RouterModule.forChild(MediasRoutingModule.routes)],
  exports: [RouterModule],
})
export class MediasRoutingModule {
  public static routes: Routes = [
    {
      path: 'add',
      component: CreateMediaComponent,
      canActivate: [RoleGuard],
      data: {
        allowedRoles: ['CONCEPTOR', 'MANAGER'],
        title: 'Dashboard | Add Media',
        breadcrumb: 'Create Media',
      },
    },
    {
      path: 'update',
      component: UpdateMediaComponent,
      canActivate: [RoleGuard],
      data: {
        allowedRoles: ['CONCEPTOR', 'MANAGER'],
        title: 'Dashboard | Update Media',
        breadcrumb: 'Update Media',
      },
    },
    {
      path: ':id/view',
      data: { title: 'Dashboard | View media', breadcrumb: 'View media' },
      component: ViewMediaComponent,
    },
    {
      path: '',
      component: ListMediaComponent,
      canActivate: [RoleGuard],
      data: {
        allowedRoles: ['CONCEPTOR', 'MANAGER'],
        title: 'Dashboard | Media Hub',
        breadcrumb: 'Media Hub',
      },
    },
  ];
}
