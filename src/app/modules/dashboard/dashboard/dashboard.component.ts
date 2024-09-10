import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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


  pieData = [
    {
      "name": "Sales",
      "value": 9322400
    },
    {
      "name": "Expenses",
      "value": 932240
    },
    {
      "name": "Profit",
      "value": 932240
    },
    {
      "name": "Loss",
      "value": 932240
    }
  ];

  // View size (Optional)
  view: [number, number] = [400, 400];

  // Color scheme
  colorScheme: any = {
    domain: ['#7CB5EC', '#dc3545', '#28a745', '#111111']
  };

  // Labels visibility
  showLabels = false;


  colorSchemeSingl: any = {
    domain: ['#08DDC1', '#FFDC1B', '#FF5E3A']
  };

  data = [
    {
      "name": "green",
      "series": [
        {
          "name": "Aug",
          "value": 14
        },
        {
          "name": "Sep",
          "value": 35
        },
        {
          "name": "Oct",
          "value": 4
        },
        {
          "name": "Nov",
          "value": 17
        },
        {
          "name": "Dec",
          "value": 14
        },
        {
          "name": "Jan",
          "value": 35
        }
      ]
    },

    {
      "name": "yellow",
      "series": [
        {
          "name": "Aug",
          "value": 364
        },
        {
          "name": "Sep",
          "value": 412
        },
        {
          "name": "Oct",
          "value": 437
        },
        {
          "name": "Nov",
          "value": 4437
        },
        {
          "name": "Dec",
          "value": 364
        },
        {
          "name": "Jan",
          "value": 412
        }
      ]
    },
    {
      "name": "red",
      "series": [
        {
          "name": "Aug",
          "value": 168
        },
        {
          "name": "Sep",
          "value": 343
        },
        {
          "name": "Oct",
          "value": 512
        },
        {
          "name": "Nov",
          "value": 491
        },
        {
          "name": "Dec",
          "value": 168
        },
        {
          "name": "Jan",
          "value": 343
        },
      ]
    }
  ]
  horizontalLines = [
    { position: 50 }, // Adjust position values as needed
    { position: 100 }
  ];




  //Profit and loss

  dataProfit = [
    {
      "name": "Category A",
      "value": 30
    },
    {
      "name": "Category B",
      "value": 80
    },
    {
      "name": "Category C",
      "value": 45
    },
    {
      "name": "Category D",
      "value": 60
    }
  ];

  colorSchemeProfit: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };






  changeTab(tabId: string){
this.tabId = tabId;
  }

}

