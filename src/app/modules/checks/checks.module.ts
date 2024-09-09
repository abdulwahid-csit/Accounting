import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecksComponent } from './checks.component';
import { ChecksRoutes } from './checks.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ChecksRoutes
  ],
  declarations: [ChecksComponent],
  exports: [
    RouterModule
  ]
})
export class ChecksModule { }
