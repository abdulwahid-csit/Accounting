import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../../css/custpm-dropdown-style.scss']
})
export class DashboardComponent implements OnInit {
  applicationForm!: FormGroup
  tabId = 'brl';
  isStatus = false;

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
  view: [number, number] = [500, 300];

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

//Cash Flow Data

  cashFlowData = [
    {
      "name": "Sales",
      "series": [
        { "name": "2023-07-01", "value": 1500000 },
        { "name": "2023-07-15", "value": 0 },
        { "name": "2023-08-01", "value": 932240 },
        { "name": "2023-08-15", "value": 0 }
      ]
    },
    {
      "name": "Expenses",
      "series": [
        { "name": "2023-07-01", "value": 500000 },
        { "name": "2023-07-15", "value": 0 },
        { "name": "2023-08-01", "value": 932240 },
        { "name": "2023-08-15", "value": 98989 },
        { "name": "2023-07-01", "value": 500000 },
        { "name": "2023-07-15", "value": 0 },
        { "name": "2024-08-01", "value": 932240 },
        { "name": "2024-08-15", "value": 500000 },
        { "name": "2024-07-01", "value": 500000 },
        { "name": "2024-07-15", "value": 0 },
        { "name": "2024-08-01", "value": 7676 },
        { "name": "2024-08-15", "value": 500000 }
      ]
    }
  ];

  colorSchemeCashflow: any = {
    domain: ['#7CB5EC', '#dc3545'] // Custom colors for each line
  };

  // Chart options
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Amount';



  changeTab(tabId: string) {
    this.tabId = tabId;
  }


  // view: [number, number] = [700, 400];
  
  // Data for the bar chart
  profitLossData = [
    {
      "name": "Income",
      "value": 93298
    },
    {
      "name": "Expenses",
      "value": 3294289.68
    },
    {
      "name": "Net Income",
      "value": -3201291.68
    }
  ];

  // Color scheme for different categories
  colorSchemeProfitAndLoss:any = {
    domain: ['#28a745', '#343a40', '#007bff'] // Custom colors for Income (green), Expenses (gray), Net Income (blue)
  };

  // Options for axis and grid
  showXAxisProfitandLoss = true;
  showYAxisProfitAndLoss = true;
  showGridLinesProfitAndLoss = false;
  barPaddingProfitAndLoss = 100;
  xAxisLabelProfitAndLoss = 'BRL';
  yAxisLabelProfitAndLoss = '';
  showLegendProfitAndLoss = false;




  incomeData = [
    {
      "name": "Income",
      "series": [
        {
          "name": "Open Invoice",
          "value": 360480
        },
        {
          "name": "Overdue Invoices",
          "value": 0
        },
        {
          "name": "Paid last 30 days",
          "value": 3435900.90
        },
        {
          "name": "Has been mapped",
          "value": 92898
        }
      ]
    }
  ];

  // Custom color scheme for different categories
  colorSchemeIncome:any = {
    domain: ['#6c757d', '#dc3545', '#28a745', '#007bff'] // Gray, Red, Green, Blue
  };



  ngOnInit(): void {
    this.applicationForm = new FormGroup({
      organization: new FormControl('', [Validators.required]),
    })
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.applicationForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

}



