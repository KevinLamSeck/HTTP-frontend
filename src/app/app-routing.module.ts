import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { LandingPageComponent } from './pages/landing/landing-page/landing-page.component';
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
  public static readonly routes: Routes = [
    {
      path: '',
      component: LandingPageComponent,
      canActivate: [NoAuthGuard]
    },
    {
      path: 'user',
      loadChildren: () =>
        import('./user/user.module').then((m) => m.UserModule),
      canActivate: [NoAuthGuard]
    },
    {
      path: '',
      pathMatch: 'full',
      // canActivate: [AuthGuard],
      redirectTo: `/dashboard/${DashboardRoutingModule._currentUser}`
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
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
      path: 'dashboard/**',
      component: NotFoundComponent,
      pathMatch: 'full',
      data: { title: 'HTTP | You are lost ?' },
    },
  ];
}
