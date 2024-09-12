import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SalesComponent } from './components/inventory/sales/sales.component';
import { ExpensesComponent } from './components/inventory/expenses/expenses.component';
import { PayslipsComponent } from './components/inventory/payslips/payslips.component';
import { PurchaseComponent } from './components/inventory/purchase/purchase.component';
import { ManufacturingComponent } from './components/inventory/manufacturing/manufacturing.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { FixedEquipmentComponent } from './components/inventory/fixed-equipment/fixed-equipment.component';

const routes: Routes = [
  { path: '', component:  SalesComponent},
  { path: 'sale', component:  SalesComponent},
  { path: 'expenses', component:  ExpensesComponent},
  { path: 'payslips', component:  PayslipsComponent},
  { path: 'purchase', component:  PurchaseComponent},
  { path: 'manufacturing', component:  ManufacturingComponent},
  { path: 'inventory', component:  InventoryComponent},
  { path: 'fixed-equipment', component:  FixedEquipmentComponent},
];

export const TransactionsRoutes = RouterModule.forChild(routes);
