import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateModuleComponent } from './pages/create-module/create-module.component';
import { ListModuleComponent } from './pages/list-module/list-module.component';
import { UpdateModuleComponent } from './pages/update-module/update-module.component';
import { ViewModuleComponent } from './pages/view-module/view-module.component';


@NgModule({
  imports: [RouterModule.forChild(ModulesRoutingModule.routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {
  public static routes: Routes = [
    {
      path: 'add',
      data: { title: 'Dashboard | Create a new module', breadcrumb: 'Create a new module' },
      component: CreateModuleComponent
    },
    {
      path: ':id/update',
      data: { title: 'Dashboard | Update a module', breadcrumb: 'Update a module' },
      component: UpdateModuleComponent
    },
    {
      path: ':id/view',
      data: { title: 'Dashboard | View module', breadcrumb: 'View module' },
      component: ViewModuleComponent
    },
    {
      path: '',
      data: { title: 'Dashboard | My modules', breadcrumb: 'My modules' },
      component: ListModuleComponent
    },
    // {
    //   path: '**',
    //   redirectTo: '/dashboard/conceptor/module',
    //   pathMatch: 'full'
    // }
  ]
}
