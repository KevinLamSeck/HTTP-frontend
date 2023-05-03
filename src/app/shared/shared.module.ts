import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '../ui/ui.module';
import { NumberOnlyInputDirective } from './directives/number-only-input.directive';
import { ToggleDirective } from './directives/toggle.directive';
import { CourseSVGComponent } from './svg/course-svg/course-svg.component';
import { ModuleSVGComponent } from './svg/module-svg/module-svg.component';
import { MediaSVGComponent } from './svg/media-svg/media-svg.component';




@NgModule({
  declarations: [
    ToggleDirective,
    NumberOnlyInputDirective,
    CourseSVGComponent,
    ModuleSVGComponent,
    MediaSVGComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    UiModule,
    ReactiveFormsModule,
    ToggleDirective,
    NumberOnlyInputDirective,
    CourseSVGComponent,
    ModuleSVGComponent,
    MediaSVGComponent]
})
export class SharedModule { }
