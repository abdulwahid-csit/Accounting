import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReconcileComponent } from './reconcile.component';
import { ReconcileRoutes } from './reconcile.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReconcileRoutes
  ],
  declarations: [ReconcileComponent],
  exports: [
    RouterModule
  ]
})
export class ReconcileModule { }
