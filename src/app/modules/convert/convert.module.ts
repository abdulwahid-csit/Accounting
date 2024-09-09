import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertComponent } from './convert.component';
import { ConvertRoutes } from './convert.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ConvertRoutes
  ],
  declarations: [ConvertComponent],
  exports: [
    RouterModule
  ]
})
export class ConvertModule { }
