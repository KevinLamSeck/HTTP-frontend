import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NoAuthGuard } from './guards/no-auth.guard';

@NgModule({
  imports: [RouterModule.forChild(UserRoutingModule.routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [NoAuthGuard],
      data: { title: 'HTTP | Sign In' },
    },
    {
      path: '**',
      redirectTo: 'login',
      pathMatch: 'full'
    }
  ]
}
