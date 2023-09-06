import { NgFor } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { ICliente } from './cliente.interface';
import { ClienteService } from './clientes.service';


@Component({
  standalone: true,
  styles: [`
    .row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      border-bottom: 1px solid #000;
      align-items: center;
    }
  `],
  template: `
    <h1>Listagem de clientes ({{ qtd() }})</h1>
    <button mat-raised-button color="primary" (click)="add()">Novo</button>

    <div class="row" *ngFor="let item of clientes">
      <span>{{ item.name }}</span>
      <button mat-button (click)="edit(item)">
        <mat-icon fontIcon="edit"></mat-icon>
      </button>
    </div>
  `,
  imports: [
    NgFor,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ListComponent implements OnInit {
  qtd = computed(() => this.clienteService.clientes().length);
  clientes: ICliente[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
  ) { }

  async ngOnInit() {
    this.clientes = await this.clienteService.list();
  }

  add() {
    this.router.navigate(['cadastro'], { relativeTo: this.route });
  }

  edit(cliente: ICliente) {
    this.router.navigate(['cadastro', cliente.id], { relativeTo: this.route });
  }
}
