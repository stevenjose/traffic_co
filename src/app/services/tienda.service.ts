import { Injectable } from '@angular/core';
import { Tienda } from '../interfaces/tiendas.inteface';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  tienda: Tienda[] =[];
  constructor(private http: HttpClient) {
    this.getTiendas();
   }


   getTiendas() {
    return new Promise( (resolve, reject) =>{
      this.http.get<Tienda[]>('https://traffic-ec8eb.firebaseio.com/tiendas.json')
      .subscribe( (resp: Tienda[]) =>{
        this.tienda = resp;
        resolve();
      });
    });

   }


}
