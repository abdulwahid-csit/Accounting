import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private LocalStoreService: LocalStoreService
  ) {}
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.LocalStoreService.getItem('access_token')}`
    });
  }
  createBankingResource(data: any): Observable<any> {
    const url = `${this.apiUrl}banking`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
  getBankingResource(): Observable<any> {
    const url = `${this.apiUrl}banks`; 
    return this.http.get(url, { headers: this.getHeaders() });
  }
  getBankResource(page: number = 1, pageSize: number = 10): Observable<any> {
    const url = `${this.apiUrl}banking`;
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get(url, { headers: this.getHeaders(), params });
}

  editBankingResource(id: string, data: any): Observable<any> {
      const url = `${this.apiUrl}banking/${id}`;
      return this.http.put(url, data, { headers: this.getHeaders() });
    }
  
  deleteBankingResource(id: string): Observable<any> {
      const url = `${this.apiUrl}banking/${id}`;
      return this.http.delete(url, { headers: this.getHeaders() });
    }
}
