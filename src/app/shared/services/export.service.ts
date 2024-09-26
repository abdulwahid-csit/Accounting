import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'; 
import * as XLSX from 'xlsx'; 
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  // Exporting to pdf
  exportToPDF(receivedData: any) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const marginLeft = 10;
    const marginTop = 20;

    const titleFontSize = 18;
    const subtitleFontSize = 14;
    const dateFontSize = 10;

    doc.setFontSize(titleFontSize);
    const titleWidth = doc.getStringUnitWidth(receivedData.title) * titleFontSize / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(receivedData.title, titleX, marginTop);

    doc.setFontSize(subtitleFontSize);
    const subtitleWidth = doc.getStringUnitWidth(receivedData.subtitle) * subtitleFontSize / doc.internal.scaleFactor;
    const subtitleX = (pageWidth - subtitleWidth) / 2;
    doc.text(receivedData.subtitle, subtitleX, marginTop + 7);

    doc.setFontSize(dateFontSize);
    const dateText = `as of ${receivedData.date}`;
    const dateWidth = doc.getStringUnitWidth(dateText) * dateFontSize / doc.internal.scaleFactor;
    const dateX = (pageWidth - dateWidth) / 2;
    doc.text(dateText, dateX, marginTop + 14);

    doc.line(marginLeft, marginTop + 20, 200, marginTop + 20);

    const headers = [['Name', '2023', '2024']];
    const rows: any = [];

    this.buildRows(receivedData.data, rows);

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: marginTop + 25,
      theme: 'grid',
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'left' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      styles: { overflow: 'linebreak', cellPadding: 3, fontSize: 10 },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' },
        2: { halign: 'right' }
      }
    });

    // Save the PDF
    doc.save(`${receivedData.title}.pdf`);
  }
  // building rows for the pdf and excel
  private buildRows(data: any, rows: any[]) {
    data.forEach((category: any) => {
      rows.push([category.name, category.value2023 || '', category.value2024 || '']);
      
      if (category.currentAssets) {
        category.currentAssets.forEach((subCategory: any) => {
          rows.push([subCategory.name, subCategory.value2023 || '', subCategory.value2024 || '']);
          if (subCategory.currentAssetsDetails) {
            subCategory.currentAssetsDetails.forEach((detail: any) => {
              rows.push([detail.name, detail.value2023 || '', detail.value2024 || '']);
              if (detail.arDetails) {
                detail.arDetails.forEach((arDetail: any) => {
                  rows.push([arDetail.name, arDetail.value2023 || '', arDetail.value2024 || '']);
                });
              }
            });
          }
        });
      }

      if (category.longTermAssets) {
        category.longTermAssets.forEach((longTermAsset: any) => {
          rows.push([longTermAsset.name, longTermAsset.value2023 || '', longTermAsset.value2024 || '']);
        });
      }
    });
  }
  // exporting to excel
  exportToExcel(receivedData: any) {
    const rows: any[] = [];
    
    if (receivedData) {
        rows.push([receivedData.title]);
        rows.push([receivedData.subtitle]);
        rows.push([`As of: ${receivedData.date}`]);
        rows.push([]);
        rows.push(['Name', '2023', '2024']);
        
        if (receivedData.data) {
            this.buildRows(receivedData.data, rows);
        } else {
            console.error("Received data is not in the expected format:", receivedData);
            return; 
        }
        // Creating the worksheet
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, receivedData.title);
        
        XLSX.writeFile(wb, `${receivedData.title}.xlsx`);
    } else {
        console.error("Received data is not in the expected format:", receivedData);
    }
}

}
