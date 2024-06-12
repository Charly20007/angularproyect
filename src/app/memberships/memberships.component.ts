import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuscriptionService } from '../services/suscription.service';
import { AuthService } from '../auth/auth.service';

interface ApiResponse {
  status: number;
  description: string;
  objModel: {
    suscriptions: any; 
  };
}

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss']
})
export class MembershipsComponent implements OnInit {
  suscriptions: ApiResponse;
  errorMessage: string = '';

  constructor(
    private suscriptionService: SuscriptionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.suscriptions = { status: 0, description: '', objModel: { suscriptions: [] } };
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.suscriptionService.getSuscriptions(userId).subscribe(
        (data: ApiResponse) => {
          console.log('API response:', data);  // Log the API response
          this.suscriptions = data,
          console.log('Suscriptions:', this.suscriptions);  // Log the suscriptions variable
        },
        error => {
          this.errorMessage = 'Error al cargar las suscripciones.';
          console.error('API error:', error);  // Log any errors
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
}

