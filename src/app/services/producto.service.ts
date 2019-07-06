import { Producto } from './../interfaces/productos.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  productos: Producto[] = [];

  constructor( private http: HttpClient) {
    console.log('Servicio');
    this.cargarProductos();
  }


  private cargarProductos() {
    // tslint:disable-next-line: no-shadowed-variable
        return new Promise(  ( resolve, reject ) => {
          this.http.get<any>('https://traffic-ec8eb.firebaseio.com/productos_idx.json')
              .subscribe( (resp: Producto[]) => {
                this.productos = resp;
                //console.log(this.productos);
                //this.cargando = false;
                resolve();
              });

        });
      }
}
