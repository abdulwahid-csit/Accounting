import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ReconcilationDetail',
  templateUrl: './ReconcilationDetail.component.html',
  styleUrls: ['./ReconcilationDetail.component.scss']
})
export class ReconcilationDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 date = '19/09/2024';
 balanceSheetData = [
  {
    name: 'Assets',
    value2024: '',
    value2023: '',
    expanded: true,
    currentAssets: [
      {
        name: 'Current assets',
        value2024: '',
        value2023: '',
        expanded: true,
        currentAssetsDetails: [
          {
            name: 'Accounts Receivable (A/R)',
            value2024: 'Rs 2.109.629,34',
            value2023: 'Rs 0',
            expanded: true,
            arDetails: [
              { name: '111 - abc', value2024: 'Rs 0', value2023: 'Rs 0' },
            ],
          },
          { name: 'Total Accounts Receivable', value2024: 'Rs 2.109.629,34', value2023: 'Rs 0' },
          
          // AXIS bank with nested dropdown
          {
            name: 'AXIS bank',
            value2024: 'Rs 25.000',
            value2023: 'Rs 0',
            expanded: true,
            bankDetails: [
              { name: 'Chris Love', value2024: 'Rs 344.444', value2023: 'Rs 0' },
            ]
          },
          { name: 'Total for AXIS bank', value2024: 'Rs 369.444', value2023: 'Rs 0' },

          { name: 'Cash and cash equivalents', value2024: 'Rs -2.146.392,01', value2023: 'Rs 0' },
          { name: 'Allowance for bad debts', value2024: 'Rs 0', value2023: 'Rs 0' },

          // Available for sale assets (short-term) with nested dropdown
          {
            name: 'Available for sale assets (short-term)',
            value2024: 'Rs -200',
            value2023: 'Rs 0',
            expanded: false,
            shortTermAssetsDetails: [
              { name: '1111', value2024: 'Rs 0', value2023: 'Rs 0' }
            ]
          },
          { name: 'Total for Available for sale assets (short-term)', value2024: 'Rs -200', value2023: 'Rs 0' },

          { name: 'Inventory', value2024: 'Rs 0', value2023: 'Rs 0' },
          { name: 'Inventory Asset', value2024: 'Rs 109.802,50', value2023: 'Rs 0' },
          { name: 'Uncategorised Asset', value2024: 'Rs 0', value2023: 'Rs 0' },
          { name: 'Prepaid Expenses', value2024: 'Rs 0', value2023: 'Rs 0' },
          { name: 'Undeposited Funds', value2024: 'Rs 0', value2023: 'Rs 0' },
        ],
      },
      { name: 'Total Current Assets', value2024: 'Rs 427.183,83', value2023: 'Rs 0' },
    ],
  },
  {
    name: 'Long-term assets',
    value2024: '',
    value2023: '',
    expanded: true,
    longTermAssets: [
      { name: 'Accumulated depreciation on property, plant and equipment', value2024: 'Rs 0', value2023: 'Rs 0' },
      { name: 'Property, plant and equipment', value2024: 'Rs 0', value2023: 'Rs 0' },
      { name: 'Assets held for sale', value2024: 'Rs 0', value2023: 'Rs 0' },
      { name: 'Deferred tax assets', value2024: 'Rs 0', value2023: 'Rs 0' },
      { name: 'Goodwill', value2024: 'Rs 0', value2023: 'Rs 0' },
      { name: 'Intangibles', value2024: 'Rs 0', value2023: 'Rs 0' },
      { name: 'Long-term investments', value2024: 'Rs 0', value2023: 'Rs 0' },
    ],
  },
  { name: 'Total long-term assets', value2024: 'Rs 0', value2023: 'Rs 0' }
];

toggleSection(item: any) {
  item.expanded = !item.expanded;
}
}
