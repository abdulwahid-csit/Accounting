import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistersComponent } from './registers.component';
import { RouterModule } from '@angular/router';
import { RegistersRoutes } from './registers.routing';

@NgModule({
  imports: [
    CommonModule,
    RegistersRoutes
  ],
  declarations: [RegistersComponent],
  exports: [
    RouterModule
  ]
})
export class RegistersModule { }
