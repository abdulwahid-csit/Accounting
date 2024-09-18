import { Component, OnInit } from '@angular/core';
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
  importDataAsObject: any;

  constructor() { }
  ngOnInit() {
  }

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
    const camelCaseKeys = keys.map((key: string) => this.toCamelCase(key));
    const arrayOfObjects = this.importData.slice(1).map((row: { [x: string]: null; }) => {
      return camelCaseKeys.reduce((obj: { [x: string]: any; }, key: string | number, index: string | number) => {
        obj[key] = row[index] || null;
        return obj;
      }, {});
    });

    this.importDataAsObject = arrayOfObjects;
  }

  toCamelCase(str: string): string {
    return str
      .replace(/[()]/g, '')
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, '');
  }

  writeDataToServer() {
    this.isImportButtonDisabled = true;
    console.log("Data Send to Server.")
  }

}
