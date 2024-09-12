import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutes } from './transactions.routing';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SalesComponent } from './components/inventory/sales/sales.component';
import { ExpensesComponent } from './components/inventory/expenses/expenses.component';
import { ManufacturingComponent } from './components/inventory/manufacturing/manufacturing.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { FixedEquipmentComponent } from './components/inventory/fixed-equipment/fixed-equipment.component';
import { PayslipsComponent } from './components/inventory/payslips/payslips.component';
import { PurchaseComponent } from './components/inventory/purchase/purchase.component';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutes,
    NgSelectModule
  ],
  declarations: [SalesComponent, ExpensesComponent, ManufacturingComponent, InventoryComponent, FixedEquipmentComponent, PayslipsComponent, PurchaseComponent],
  exports: [
    RouterModule,
  ]
  
})
export class TransactionsModule { }
