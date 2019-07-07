import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tienda } from '../models/tienda.model';


@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  tiendasBD: any;
  constructor(private http: HttpClient,
              public db: AngularFirestore) {
              this.getTiendas();
   }

   getTiendas() {
      this.tiendasBD = this.db.collection('tiendas').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Tienda;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
   }


}
