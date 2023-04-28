import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '../ui/ui.module';
import { NumberOnlyInputDirective } from './directives/number-only-input.directive';
import { ToggleDirective } from './directives/toggle.directive';



@NgModule({
  declarations: [
    ToggleDirective,
    NumberOnlyInputDirective
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
    NumberOnlyInputDirective
  ]
})
export class SharedModule { }
