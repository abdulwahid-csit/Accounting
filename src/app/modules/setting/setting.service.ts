import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private apiUrl = environment.apiUrl;
  constructor( private http: HttpClient,
    private LocalStoreService: LocalStoreService) {  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStoreService.getItem('access_token')}`
    });
  }
  createSettingsGeneral(data: any): Observable<any> {
    const url = `${this.apiUrl}settings-general/create-update`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
  getGenralSetting(business:any): Observable<any> {
    const url = `${this.apiUrl}settings-general/${business}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  createSettingsPaySlips(data: any): Observable<any> {
    const url = `${this.apiUrl}pay-slip/create-update`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
  getSettingsPaySlips(business:any): Observable<any> {
    const url = `${this.apiUrl}pay-slip/${business}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  createSettingsPurchase(data: any): Observable<any> {
    const url = `${this.apiUrl}purchase/create-update`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
  getSettingsPurchase(business:any): Observable<any> {
    const url = `${this.apiUrl}purchase/${business}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  createSettingsInventory(data: any): Observable<any> {
    const url = `${this.apiUrl}inventory/create-update`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
  getSettingsInventory(business:any): Observable<any> {
    const url = `${this.apiUrl}inventory/${business}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  createSettingsManufacture(data: any): Observable<any> {
    const url = `${this.apiUrl}manufacture/create-update`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
  getSettingsManufacture(business:any): Observable<any> {
    const url = `${this.apiUrl}manufacture/${business}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
