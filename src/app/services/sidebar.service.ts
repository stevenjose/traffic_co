import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo:  'Proveedores', url: '/proveedores' },
        { titulo : 'Productos', url: '/productos' },
        { titulo : 'Tiendas', url: '/tiendas' },
        { titulo : 'Inventario', url: '/inventario' }
      ]
    }
  ];
  constructor() { }
}
