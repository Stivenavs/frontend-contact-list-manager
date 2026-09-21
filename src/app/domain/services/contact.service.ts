import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BackofficeApiService } from './backoffice-api.service';
import { PortalContact, PortalContactsResponse, PortalContactResponse } from '../interfaces/contact.interface';

const PATH = '/api/v1/contact-manager/api/contacts';

@Injectable({ providedIn: 'root' })
export class ContactService extends BackofficeApiService {

  constructor(http: HttpClient) { super(http); }

  getAll(): Observable<PortalContact[]> {
    return this.http
      .get<PortalContact[]>(this.url(PATH), { headers: this.getAuthHeaders() })
      .pipe(catchError(e => this.handleError(e)));
  }

  create(item: PortalContact): Observable<PortalContact> {
    return this.http
      .post<PortalContact>(this.url(PATH), item, { headers: this.getAuthHeaders() })
      .pipe(catchError(e => this.handleError(e)));
  }

  update(id: number, item: PortalContact): Observable<PortalContact> {
    return this.http
      .put<PortalContact>(`${this.url(PATH)}/${id}`, item, { headers: this.getAuthHeaders() })
      .pipe(catchError(e => this.handleError(e)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.url(PATH)}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(e => this.handleError(e)));
  }
}