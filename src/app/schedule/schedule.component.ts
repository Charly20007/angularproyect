import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuscriptionService } from '../services/suscription.service';
import { PaymentValidationService } from '../services/payment.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedule: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private suscriptionService: SuscriptionService,
    private paymentValidationService: PaymentValidationService
  ) {}

  ngOnInit(): void {
    const suscriptionId = this.route.snapshot.paramMap.get('id');
    if (suscriptionId) {
      this.suscriptionService.getSchedule(parseInt(suscriptionId), 1).subscribe(
        (data: any) => {
          console.log('API response:', data);
          this.schedule = data.objModel;
        },
        error => {
          this.errorMessage = 'Error al cargar el cronograma de pagos.';
          console.error('API error:', error);
        }
      );
    } else {
      this.errorMessage = 'ID de suscripción no válido.';
    }
  }

  aceptarPago(payment: any): void {
    this.paymentValidationService.validarPago(payment.idSuscription, payment.idPayment, true).subscribe(
      response => {
        console.log('Pago aceptado:', response);
      },
      error => {
        console.error('Error al aceptar el pago:', error);
      }
    );
  }

  rechazarPago(payment: any): void {
    const reason = "EL CÓDIGO DE OPERACIÓN ES INCORRECTO O NO EXISTE";
    this.paymentValidationService.validarPago(payment.idSuscription, payment.idPayment, false, reason).subscribe(
      response => {
        console.log('Pago rechazado:', response);
      },
      error => {
        console.error('Error al rechazar el pago:', error);
      }
    );
  }
}


