import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportDataService {

    private reportDataSource = new BehaviorSubject<any>(null);

    reportData$ = this.reportDataSource.asObservable();
    
    updateReportData(data: any, title: any, subtitle: any, date: any) {
        const reportData = {
            data,
            title,
            subtitle,
            date
        };
        this.reportDataSource.next(reportData); 
    }
    
}
