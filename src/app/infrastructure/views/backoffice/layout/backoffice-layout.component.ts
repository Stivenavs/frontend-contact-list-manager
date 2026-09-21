import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../domain/services/auth.service';
import { UserProfile } from '../../../../domain/interfaces/user.dto';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-backoffice-layout',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule,
    ButtonModule, TooltipModule, DrawerModule,
    InputTextModule, DividerModule, ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './backoffice-layout.component.html',
  styleUrls: ['./backoffice-layout.component.css'],
})
export class BackofficeLayoutComponent implements OnInit {
  collapsed = signal(false);
  userName = '';
  avatarUrl = '';

  /* Profile drawer */
  profileVisible = false;
  profileUserId = '';
  profileUser: Partial<UserProfile> = {};
  

  readonly navItems: NavItem[] = [
    { label: 'Inicio',              icon: 'pi pi-home',        route: '/backoffice',                    exact: true },
    { label: 'Contactos',               icon: 'pi pi-users',       route: '/backoffice/contactos'            },
  ];

  constructor(
    private authService: AuthService,
    private msg: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadSessionUser();
  }

  private loadSessionUser(): void {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');    
      const full_name = user?.firstName + " " + user?.lastName
      this.userName = full_name || user?.firstName || 'Administrador';
      this.avatarUrl = user.avatarUrl;
    } catch {
      this.userName = 'Administrador';
    }
  }

  toggleSidebar(): void { this.collapsed.update(v => !v); }

  logout(): void { this.authService.logout(); }

  openProfile(): void {
    try {
      const session = JSON.parse(sessionStorage.getItem('user') || '{}');
      
      if (session) {
        this.profileUserId = session.id || '';
        this.profileUser = {
          firstName: session.firstName || '',
          lastName:  session.lastName  || '',
          email:      session.email      || '',
          phone:      session.phone      || '',
          avatarUrl: session.avatarUrl || '',
        };
      }
    } catch { /* */ }
    this.profileVisible = true;
  }

  private toast(severity: string, summary: string, detail: string): void {
    this.msg.add({ severity, summary, detail, life: 3500 });
  }
}
