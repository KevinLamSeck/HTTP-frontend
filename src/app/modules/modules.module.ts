import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { UpdateModuleComponent } from './pages/update-module/update-module.component';
import { AddMediaComponent } from './pages/medias-management/add-media/add-media.component';
import { CreateMediaComponent } from './pages/medias-management/create-media/create-media.component';
import { CreateModuleComponent } from './pages/create-module/create-module.component';
import { SearchBarComponent } from './pages/medias-management/search-bar/search-bar.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { ExistingModuleComponent } from './module-management/existing-module/existing-module.component';
import { ViewModuleComponent } from './pages/view-module/view-module.component';
import { ListModuleComponent } from './pages/list-module/list-module.component';
import { ModuleTileComponent } from './pages/list-module/module-tile/module-tile.component';



@NgModule({
  declarations: [
    CreateModuleComponent,
    UpdateModuleComponent,
    CreateMediaComponent,
    AddMediaComponent,
    SearchBarComponent,
    ExistingModuleComponent,
    SearchBarComponent,
    ViewModuleComponent,
    ListModuleComponent,
    ModuleTileComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ModulesRoutingModule
  ]
})
export class ModulesModule { }
