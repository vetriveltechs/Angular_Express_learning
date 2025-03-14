import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercasePipe } from '../pipes/uppercase.pipe';
import { LowercasePipe } from '../pipes/lowercase.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

@NgModule({
  declarations: [
    UppercasePipe,
    LowercasePipe,
    CapitalizePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UppercasePipe,
    LowercasePipe,
    CapitalizePipe
  ]
})
export class CommonModulesModule {}  // Make sure class name matches the filename
