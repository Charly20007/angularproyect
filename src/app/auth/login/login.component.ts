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
    // Verifica que se haya ingresado un nombre de usuario y una contraseña
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingresa un nombre de usuario y una contraseña.';
      return;
    }

    // Envía la solicitud de inicio de sesión a la API
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        // Navega a la página de membresías si el inicio de sesión es exitoso
        this.router.navigate(['/memberships']);
      } else {
        // Muestra un mensaje de error si el inicio de sesión falla
        this.errorMessage = 'Usuario o contraseña inválidos.';
      }
    });
  }
}

