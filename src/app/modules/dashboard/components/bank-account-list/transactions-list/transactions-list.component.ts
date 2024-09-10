import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  tabId = 'brl';
  tabs = [
    {
      id: 'brl', label: 'BRL(R$)', currency: 'R$', data: [
        { transaction: 'Invoice', qty: 145, amount: 'R$3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: 'R$2,619,461.47' },
        { transaction: 'Invoice', qty: 145, amount: 'R$3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: 'R$2,619,461.47' },
        { transaction: 'Invoice', qty: 145, amount: 'R$3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: 'R$2,619,461.47' },
        { transaction: 'Invoice', qty: 145, amount: 'R$3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: 'R$2,619,461.47' },
        { transaction: 'Payment', qty: 85, amount: 'R$2,619,461.47' },
        { transaction: 'Payment', qty: 85, amount: 'R$2,619,461.47' },

        { transaction: 'Expense of', qty: 18, amount: 'R$857,619' }
      ]
    },
    {
      id: 'xaf', label: 'XAF(FCFA)', currency: 'FCFA', data: [
        { transaction: 'Invoice', qty: 145, amount: 'FCFA3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: 'FCFA2,619,461.47' },
        { transaction: 'Expense of', qty: 18, amount: 'FCFA857,619' }
      ]
    },
    {
      id: 'qar', label: 'QAR(QAR)', currency: 'QAR', data: [
        { transaction: 'Invoice', qty: 145, amount: 'QAR3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: 'QAR2,619,461.47' },
        { transaction: 'Expense of', qty: 18, amount: 'QAR857,619' }
      ]
    },
    {
      id: 'inr', label: 'INR(₹)', currency: '₹', data: [
        { transaction: 'Invoice', qty: 145, amount: '₹3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: '₹2,619,461.47' },
        { transaction: 'Expense of', qty: 18, amount: '₹857,619' }
      ]
    },
    {
      id: 'usd', label: 'USD($)', currency: '$', data: [
        { transaction: 'Invoice', qty: 145, amount: '$3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: '$2,619,461.47' },
        { transaction: 'Expense of', qty: 18, amount: '$857,619' }
      ]
    },
    {
      id: 'sar', label: 'SAR(SAR)', currency: 'SAR', data: [
        { transaction: 'Invoice', qty: 145, amount: 'SAR3,859,404.50' },
        { transaction: 'Payment', qty: 85, amount: 'SAR2,619,461.47' },
        { transaction: 'Expense of', qty: 18, amount: 'SAR857,619' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  changeTab(tabId: string){
    this.tabId = tabId;
      }

}
