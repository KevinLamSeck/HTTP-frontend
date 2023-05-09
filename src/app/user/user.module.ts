import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { RecoveryComponent } from './dialogs/recovery/recovery.component';
import { RecoveryPasswordComponent } from './dialogs/recovery-password/recovery-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RecoveryComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
