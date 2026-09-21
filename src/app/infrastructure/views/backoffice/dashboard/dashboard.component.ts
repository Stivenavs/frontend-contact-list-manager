import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TagModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName = '';

  stats: StatCard[] = [
    { label: 'Gestión de contactos',  value: 'Administrar contactos', icon: 'pi pi-users',   color: '#003399', route: '/backoffice/contactos' },
  ];

  ngOnInit(): void {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const full_name = user?.firstName + " " + user?.lastName
      this.userName = full_name || user?.firstName || 'Administrador';
    } catch {
      this.userName = 'Administrador';
    }
  }
}
