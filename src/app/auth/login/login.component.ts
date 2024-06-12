import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingresa un nombre de usuario y una contraseña.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/memberships']);
      } else {
        this.errorMessage = 'Usuario o contraseña inválidos.';
      }
    });
  }
}

