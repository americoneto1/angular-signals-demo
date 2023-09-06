import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

import { ICliente } from './cliente.interface';
import { ClienteService } from './clientes.service';


@Component({
  standalone: true,
  styles: [
    `.example-full-width {
      width: 100%;
    }
    .row {
      display: flex;
      justify-content: space-between;
    }
    `
  ],
  template: `
    <h1>Cadastro de clientes</h1>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field class="example-full-width">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="name" autocomplete="off" />
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <mat-label>Telefone</mat-label>
        <input matInput formControlName="phone" autocomplete="off" />
      </mat-form-field>
      <div class="row">
        <button mat-raised-button color="primary" [disabled]="!form.valid">{{ buttonLabel }}</button>
        <button mat-raised-button type="button" color="warn" (click)="remove()" *ngIf="buttonLabel === 'alterar'">Excluir</button>
      </div>
    </form>
  `,
  imports: [
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class CadastroComponent implements OnInit {
  buttonLabel = 'cadastrar';

  form = this.formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const cliente = await this.clienteService.get(parseInt(id));
      if (cliente) {
        this.form.setValue(cliente);
        this.buttonLabel = 'alterar';
      }
    }
  }

  onSubmit() {
    if (!this.form.valid) return;
    const id = this.form.controls.id.value;

    if (id === 0) {
      this.clienteService.add(this.form.value as ICliente);
    } else {
      this.clienteService.update(
        id as number,
        this.form.value as ICliente
      );
    }
    this.router.navigate(['clientes']);
  }

  remove() {
    const id = this.form.controls.id.value;
    this.clienteService.remove(id as number);
    this.router.navigate(['clientes']);
  }
}
