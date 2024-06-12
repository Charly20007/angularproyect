import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentValidationService {
  private validateUrl = 'https://inclubtest.com:2053/api/payment/validate';

  constructor(private http: HttpClient) {}

  validarPago(idSuscription: number, idPayment: number, isAccepted: boolean, reason?: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      IdSuscription: idSuscription,
      ListIdPaymentsValidate: [idPayment],
      IsAcceptedPayment: isAccepted ? 1 : 0,
      ReasonRejection: {
        id: idPayment,
        Detalle: reason || ""
      }
    };

    return this.http.post<any>(this.validateUrl, body, { headers });
  }
}

