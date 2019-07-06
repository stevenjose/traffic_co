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
    this.createInventario();
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

  createInventario() {
    console.log('Crear Inventario');
    const data = {
      id_producto: '004',
      id_tienda: '002',
      producto: 'Lenovo',
      stock: '250'
    }

    this.http.post('https://traffic-ec8eb.firebaseio.com/inventario' + '/post', data)
    .subscribe( resp => {
      if(resp){
        console.log(resp);
      }
    });
    console.log('Creado');
  }



}
