import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './autofocus.directive';
import { TroncatePipe } from './troncate.pipe';



@NgModule({
  declarations: [
    AutofocusDirective,
    TroncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutofocusDirective,
    TroncatePipe
  ]
})
export class WidgetsModule { }
