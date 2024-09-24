import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-account',
  templateUrl: './import-account.component.html',
  styleUrls: ['./import-account.component.scss', '../../../css/custpm-dropdown-style.scss']
})
export class ImportAccountComponent implements OnInit {
  selectedFile: File | null = null;
  isImportButtonDisabled = false;
  isFileSelected = false;
  importData: any;
  importedAccountsLengths: number = 0;
  chartOfAccountMultipleData: any;

  constructor(
    private localStorage: LocalStoreService,
    private crudService: CrudService,
    private toastService: ToastrService,
    private router: Router) { }


  ngOnInit() {}

  importFile(evt: any, eventForFileSelection: Event) {
    const input = eventForFileSelection.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isFileSelected = true;
      this.isImportButtonDisabled = false;
    } else {
      this.isFileSelected = false;
      this.isImportButtonDisabled = true;
    }

    const target: DataTransfer = <DataTransfer>(evt);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.importData = data;
      this.changeArrayToObject();
    };
    reader.readAsBinaryString(target.files[0]);
  }


  onFileSelected(event: Event): void {

  }

  changeArrayToObject() {
    const keys = this.importData[0];
    const camelCaseKeys = keys.map((key: string) => this.to_snake_case(key));
    const arrayOfObjects = this.importData.slice(1).map((row: { [x: string]: null; }) => {
      return camelCaseKeys.reduce((obj: { [x: string]: any; }, key: string | number, index: string | number) => {
        obj[key] = row[index] || null;
        return obj;
      }, {});
    });

    const importDataAsObject = arrayOfObjects;
    this.chartOfAccountMultipleData = importDataAsObject.map((account: any) => ({
      ...account,
      business: this.localStorage.getItem('user')?.business
    }));
    this.importedAccountsLengths = this.chartOfAccountMultipleData.length;
  }

  to_snake_case(str: string): string {
    return str
      .replace(/[()]/g, '')
      .replace(/\s+/g, '_')
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/_{2,}/g, '_')
      .toLowerCase();
  }



  submittDataToServer() {
    this.isImportButtonDisabled = true;
    this.crudService.create('charts-of-accounts/create-many', this.chartOfAccountMultipleData).subscribe(response => {
      if (response.data?.status_code == 201) {
        this.toastService.success(`${this.importedAccountsLengths} accounts are added.`, 'Success')
        this.router.navigate(['charts-of-account']);
      }
    }, error => {
      this.toastService.error(error.message, "Error !");
    })
  }
}
