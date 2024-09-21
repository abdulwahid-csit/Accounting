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
    const url = `${this.apiUrl}banking`; 
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
