import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MediaTileComponent } from './components/media-tile/media-tile.component';
import { MediasRoutingModule } from './medias-routing.module';
import { CreateMediaComponent } from './pages/create-media/create-media.component';
import { ListMediaComponent } from './pages/list-media/list-media.component';
import { UpdateMediaComponent } from './pages/update-media/update-media.component';
import { ViewMediaComponent } from './pages/view-media/view-media.component';
import { PlayerComponent } from './components/player/player.component';



@NgModule({
  declarations: [
    CreateMediaComponent,
    UpdateMediaComponent,
    ListMediaComponent,
    MediaTileComponent,
    ViewMediaComponent,
    PlayerComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MediasRoutingModule
  ]
})
export class MediasModule { }
