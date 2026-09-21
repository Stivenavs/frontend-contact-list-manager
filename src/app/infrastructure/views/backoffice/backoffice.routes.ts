import { Routes } from '@angular/router';
import { BackofficeLayoutComponent } from './layout/backoffice-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';

export const backofficeRoutes: Routes = [
  {
    path: '',
    component: BackofficeLayoutComponent,
    children: [
      { path: '',                  component: DashboardComponent,               title: 'Dashboard' },
      { path: 'contactos',          component: ContactManagerComponent,         title: 'Gestión de Contactos' },
    ],
  },
];
