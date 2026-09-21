import { Routes } from '@angular/router';
import { LoginComponent } from './infrastructure/views/login/login.component';
import { DashboardComponent } from './infrastructure/views/backoffice/dashboard/dashboard.component';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { LoginGuard } from './infrastructure/guards/login.guard';

export const routes: Routes = [
  { path: '',      component: DashboardComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'backoffice',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./infrastructure/views/backoffice/backoffice.routes').then(m => m.backofficeRoutes),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
