import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../domain/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const userString = sessionStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.token) {
        this.router.navigate(['/']); // Redirige a la ruta principal si ya está autenticado
        return false; // Bloquea el acceso a la ruta de login
      }
    }

    return true; // Permite el acceso a la ruta de login si no está autenticado
  }
}
