import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import { AccordionModule } from 'ngx-bootstrap/accordion';

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}
@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
  ],
  providers:[
    { provide: AccordionConfig, useFactory: getAccordionConfig }
  ]
})
export class LayoutModule { }
