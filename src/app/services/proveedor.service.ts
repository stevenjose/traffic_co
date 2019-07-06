import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../interfaces/proveedor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  public proveedor: Proveedor[] = [];

  constructor(private http: HttpClient ) {
    this.getProveedores();
   }

   getProveedores() {
    return new Promise(  ( resolve, reject ) => {
      this.http.get<Proveedor>('https://traffic-ec8eb.firebaseio.com/proveedores.json')
          .subscribe( (resp: any) => {
            this.proveedor = resp;
            resolve();
          });

    });
   }
}
