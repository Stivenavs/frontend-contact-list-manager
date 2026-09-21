import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthServiceInterface } from '../../domain/interfaces/auth-service.interface';
import { User } from '../../domain/interfaces/user.dto';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServiceInterface {
  private currentUser: User | null = null;
  private apiUrl = environment.apiUrl + '/api/v1/contact-manager/auth/login-email';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    const body = { email, password };
    
    return this.http.post<User>(this.apiUrl, body).pipe(
      tap((user: User) => {
        this.currentUser = user;       
      }),
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores de la petición HTTP
        let errorMessage = 'Ocurrió un error desconocido';
        if (error.status === 404) {
          errorMessage = 'El usuario no existe.';
        } else if (error.status === 401) {
          errorMessage = 'Contraseña incorrecta.';
        }
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  logout(): void {
    this.currentUser = null;
    sessionStorage.clear(); // Eliminar el objeto user del localStorage
    location.reload(); // Recargar la página
  }

  getUser(): Observable<User | null> {
    return of(this.currentUser);
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}
