import { Observable } from 'rxjs';

export interface AuthServiceInterface {
  login(email: string, password: string): Observable<any>;
  logout(): void;
  getUser(): Observable<any | null>;
}
