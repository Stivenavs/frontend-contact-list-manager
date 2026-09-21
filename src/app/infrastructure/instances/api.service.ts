import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://xxxxxxx'; // Reemplaza con tu URL base
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer xxxxxxx', // Reemplaza con tu token o header necesario
  });

  constructor(private http: HttpClient) {}

  // Método genérico para realizar solicitudes GET
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.headers,
    });
  }

  // Método genérico para realizar solicitudes POST
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.headers,
    });
  }

  // Se puede agregar más métodos para PUT, DELETE, etc.
}
