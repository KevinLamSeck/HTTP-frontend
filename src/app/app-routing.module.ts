import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/erros/not-found/not-found.component';
import { AddComponent } from './student/add/add.component';
import { ListComponent } from './student/list/list.component';
import { UpdateComponent } from './student/update/update.component';
import { AuthGuard } from './user/guards/auth.guard';
import { NoAuthGuard } from './user/guards/no-auth.guard';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

  constructor(
  ) { }

  public static readonly routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard'
    },
    {
      path: 'user',
      loadChildren: () =>
        import('./user/user.module').then((m) => m.UserModule),
      canActivate: [NoAuthGuard]
    },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'student/list',
      component: ListComponent,
      /*  canActivate: [
        AuthGuard
      ] */
    },
    {
      path: 'student/add',
      component: AddComponent,
      /*  canActivate: [
        AuthGuard
      ] */
    },
    {
      path: 'student/:id/update', // :id => sera remplacé par l'ID d'un Student à l'exécution
      component: UpdateComponent,
      /*  canActivate: [
        AuthGuard
      ] */
    },
    {
      path: '**',
      component: NotFoundComponent,
      pathMatch: 'full',
      data: { title: 'HTTP | You are lost ?' },
    },
  ];
}
