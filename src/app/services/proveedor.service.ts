import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  public proveedor: Proveedor[] = [];
  public provedorBD: any;
  constructor(private http: HttpClient,
              public db: AngularFirestore ) {
    this.getProveedores();
   }

   getProveedores() {
    this.provedorBD = this.db.collection('proveedores').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Proveedor;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
   }
}
