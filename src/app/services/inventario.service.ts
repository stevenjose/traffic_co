import { Inventario } from './../interfaces/inventario.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})


export class InventarioService {
  public inventarios: Inventario[] = [];
  //public inventarioServi = Inventario[] = [];

  constructor(private http: HttpClient) {
    this.getInventario();
   }

  getInventario() {

    return new Promise( ( resolve, reject) => {
      this.http.get('https://traffic-ec8eb.firebaseio.com/inventario.json')
      .subscribe( (resp: Inventario[]) => {
      this.inventarios = resp;
      resolve();
    });
    });

  }



}
