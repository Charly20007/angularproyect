import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {
  private suscriptionsUrl = 'https://inclubtest.com:2053/api/suscription/payment';
  private scheduleUrl = 'https://inclubtest.com:2053/api/payment/schedule/vouchers';

  constructor(private http: HttpClient) {}

  getSuscriptions(userId: number): Observable<any> {
    return this.http.get(`${this.suscriptionsUrl}/${userId}`);
  }

  getSchedule(idSuscription: number, flaguser: number): Observable<any> {
    return this.http.get(`${this.scheduleUrl}/${idSuscription}/${flaguser}`);
  }
}
