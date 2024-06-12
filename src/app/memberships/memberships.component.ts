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
          this.suscriptions = data; 
        },
        error => {
          this.errorMessage = 'Error al cargar las suscripciones.';
          console.error('API error:', error);  
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
}

