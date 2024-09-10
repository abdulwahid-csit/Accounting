import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistersComponent } from './registers.component';
import { RouterModule } from '@angular/router';
import { RegistersRoutes } from './registers.routing';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RegistersRoutes,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [RegistersComponent],
  exports: [
    RouterModule
  ]
})
export class RegistersModule { }
