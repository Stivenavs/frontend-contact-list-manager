import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ContactService } from '../../../../domain/services/contact.service';
import { PortalContact } from '../../../../domain/interfaces/contact.interface';

@Component({
  selector: 'app-contact-manager',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    TableModule, ButtonModule, DialogModule,
    InputTextModule, ToastModule, ConfirmDialogModule,
    IconFieldModule, InputIconModule, TooltipModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponent implements OnInit {
  items: PortalContact[] = [];
  item: PortalContact = this.empty();
  visible = false;
  isEditing = false;
  loading = false;

  constructor(
    private svc: ContactService,
    private msg: MessageService,
    private confirm: ConfirmationService,
  ) {}

  ngOnInit(): void { this.load(); }

  private empty(): PortalContact {
    return {
      firstName: '', lastName: '', email: '', phone: '',
    };
  }

  load(): void {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: data => { this.items = data ?? []; this.loading = false; },
      error: e => { this.toast('error', 'Error', this.errorMessage(e)); this.loading = false; },
    });
  }

  openNew(): void {
    this.item = this.empty();
    this.isEditing = false;
    this.visible = true;
  }

  edit(row: PortalContact): void {
    this.item = { ...row };
    this.isEditing = true;
    this.visible = true;
  }

  save(): void {
    if (!this.item.firstName?.trim()) {
      this.toast('warn', 'Campo requerido', 'Nombre es obligatorio.');
      return;
    }

    if (!this.item.lastName?.trim() ) {
      this.toast('warn', 'Campo requerido', 'Apellido es obligatorio.');
      return;
    }

    if (!this.item.email?.trim()) {
      this.toast('warn', 'Campo requerido', 'Correo es obligatorio.');
      return;
    }

    const payload: PortalContact = {
      firstName: this.item.firstName.trim(),
      lastName: this.item.lastName?.trim(),
      email: this.item.email.trim(),
      phone: this.item.phone?.trim(),
    };

    const op = this.isEditing
      ? this.svc.update(this.item.id!, payload)
      : this.svc.create(payload);

    op.subscribe({
      next: () => {
        this.toast('success', 'Éxito', this.isEditing ? 'Contacto actualizado.' : 'Contacto creado.');
        this.visible = false;
        this.load();
      },
      error: e => this.toast('error', 'Error', this.errorMessage(e)),
    });
  }

  confirmDelete(row: PortalContact): void {
    this.confirm.confirm({
      message: `¿Eliminar al contacto <b>${row.firstName} ${row.lastName ?? ''}</b>?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.svc.delete(row.id!).subscribe({
          next: () => { this.toast('success', 'Eliminado', 'Contacto eliminado.'); this.load(); },
          error: e => this.toast('error', 'Error', this.errorMessage(e)),
        });
      },
    });
  }

  private errorMessage(e: any): string {
    const body = e?.error;
    if (body?.errors) {
      return Object.values(body.errors).join(' · ');
    }
    return body?.detail ?? e?.message ?? 'Ocurrió un error inesperado.';
  }

  private toast(severity: string, summary: string, detail: string): void {
    this.msg.add({ severity, summary, detail, life: 3500 });
  }
}