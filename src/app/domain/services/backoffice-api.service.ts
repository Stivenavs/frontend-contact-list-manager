import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class BackofficeApiService {

  constructor(protected http: HttpClient) {}

  protected getAuthHeaders(): HttpHeaders {
    const user = this.parseUser();
    const token = user.token;
    if (!token) {
      sessionStorage.clear();
      location.reload();
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  protected parseUser(): any {
    try {
      return JSON.parse(sessionStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  }

  protected url(path: string): string {
    return `${environment.apiUrl}${path}`;
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      sessionStorage.clear();
      location.reload();
    }
    const msg =
      error.status === 404 ? 'Recurso no encontrado.' :
      error.status === 400 ? 'Datos inválidos.' :
      error.status === 500 ? 'Error interno del servidor.' :
      error.status === 0   ? 'No se pudo conectar con el servidor.' :
                             'Ocurrió un error inesperado.';
    return throwError(() => new Error(msg));
  }

  protected httpGetAll<T>(path: string): Observable<T[]> {
    return this.http
      .get<T[]>(this.url(path), { headers: this.getAuthHeaders() })
      .pipe(catchError(e => this.handleError(e)));
  }

  protected httpCreate<T>(path: string, body: T): Observable<T> {
    return this.http
      .post<T>(this.url(path), body, { headers: this.getAuthHeaders() })
      .pipe(catchError(e => this.handleError(e)));
  }

  protected httpUpdate<T>(path: string, id: number, body: T): Observable<T> {
    return this.http
      .put<T>(`${this.url(path)}/${id}`, body, { headers: this.getAuthHeaders() })
      .pipe(catchError(e => this.handleError(e)));
  }

  protected httpDelete(path: string, id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.url(path)}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(e => this.handleError(e)));
  }
}
