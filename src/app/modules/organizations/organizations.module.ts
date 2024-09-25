import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationComponent } from './organization/organization.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationListComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class OrganizationsModule { }
