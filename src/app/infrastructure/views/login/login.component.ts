import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../domain/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  rememberMe: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit(e: Event): void {
    e.preventDefault();
    this.isLoading = true;
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese su correo y contraseña.';
      this.isLoading = false;
      return;
    }

    if (this.rememberMe) {
      localStorage.setItem('email', this.email);
    } else {
      localStorage.removeItem('email');
    }
   
    this.login();
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (user: any) => {
        this.isLoading = false;

        sessionStorage.setItem('user', JSON.stringify(user));       
        this.router.navigate(['/backoffice']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.isLoading = false;
        if (err.message === 'El usuario no existe.') {
          this.errorMessage =
            'El correo electrónico ingresado no está registrado.';
        } else if (err.message === 'Contraseña incorrecta.') {
          this.errorMessage = 'La contraseña ingresada es incorrecta.';
        } else {
          this.errorMessage =
            'Error al iniciar sesión. Por favor intente nuevamente.';
        }
      },
    });
  }

}
