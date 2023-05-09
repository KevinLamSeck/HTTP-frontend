import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppInitializerService, appInitializer } from './services/app-initializer.service';
import { AvatarComponent } from './components/avatar/avatar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AvatarComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AppInitializerService,
    appInitializer
  ]
})
export class CoreModule { }
