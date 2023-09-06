import { Injectable, signal } from '@angular/core';

import { ICliente } from './cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientes = signal<ICliente[]>([]);
  api = 'http://localhost:3000/clientes';

  async list() {
    const result = await fetch(this.api).then((res) => res.json());
    this.clientes.set(result);
    return this.clientes();
  }

  add(cliente: ICliente) {
    cliente.id = Math.floor(Math.random() * 1000);
    fetch(this.api, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(cliente)
    }).then(_ => this.clientes.mutate(list => list.push(cliente)))
  }

  update(id: number, cliente: ICliente) {
    fetch(this.api + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(cliente)
    }).then(_ =>
      this.clientes.update(list => list.map(obj => {
        if (obj.id === id) {
          obj = cliente;
        }
        return obj;
      }))
    )
  }

  remove(id: number) {
    fetch(this.api + '/' + id, {
      method: 'DELETE'
    }).then(_ =>
      this.clientes.mutate(list => list.splice(this.clientes().findIndex(c => c.id === id), 1))
    );
  }

  async get(id: number) {
    return await fetch(this.api + '/' + id).then((res) => res.json());
  }
}
