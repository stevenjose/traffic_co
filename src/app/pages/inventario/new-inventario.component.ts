import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore} from '@angular/fire/firestore';
import { Inventario } from '../../models/inventario.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Tienda } from '../../models/tienda.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-inventario',
  templateUrl: './new-inventario.component.html',
  styleUrls: ['./new-inventario.component.css']
})

export class NewInventarioComponent implements OnInit {
  public forma: FormGroup;
  public inventariosBD: any;
  public document_id;
  public tiendasBD: any;

  constructor(  public db: AngularFirestore,
                public router: Router,
                public activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id ) {
          console.log(' id ' + id);
          this.cargarInventario( id );
      }
    });



      this.tiendasBD = db.collection('tiendas').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Tienda;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));

  }

  ngOnInit() {
    this.forma = new FormGroup({
      id: new FormControl(null),
      cod_prod: new FormControl(null, Validators.required ),
      id_tienda: new FormControl(null, Validators.required),
      stock: new FormControl(null, Validators.required),
    });
  }
  public getInventario(documentId: string) {
    return this.db.collection('inventarios').doc(documentId).snapshotChanges();
  }
  cargarInventario( id: string ) {
    console.log('cargarInventario');
    this.document_id = id;
    this.inventariosBD = this.getInventario(id).subscribe( (resp: any) => {

      console.log('Cargando Valores');

      this.forma.setValue({
          id: id,
          cod_prod:  resp.payload.data().cod_prod,
          id_tienda: resp.payload.data().id_tienda,
          stock: resp.payload.data().stock
        });
    });

  }

  registarInventario(){
     if ( this.forma.invalid){
      return;
    }

     let inventario = new Inventario(
      this.forma.value.cod_prod,
      this.forma.value.id_tienda,
      this.forma.value.stock
    );


     if( this.forma.value.id ) {
        console.log(this.forma.value.id + 'Id');
        this.updateInventario(inventario, this.forma.value.id).then(
          resp => {
            Swal.fire({
              type: 'success',
              title: 'Se realiza el Update satisfactoriamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/inventario']);
          }
        );

      } else {
        if (this.createInventario(inventario)){
          this.router.navigate(['/inventario'])
        }
      }
  }

  updateInventario(value: Inventario, id){
    console.log('cod_prod ' + value.codProd);
    return this.db.collection('inventarios').doc(id).set({
      cod_prod: value.codProd,
      id_tienda: value.idTienda,
      stock: value.stock
    });
  }



  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }
  createInventario(value: Inventario){
    console.log(value.codProd);
    return this.db.collection('inventarios').add({

      cod_prod: value.codProd,
      id_tienda: value.idTienda,
      stock: value.stock
    }).then( (resp) => {
      Swal.fire({
        type: 'success',
        title: 'Se registro satisfactoriamente',
        showConfirmButton: false,
        timer: 1500
      });
      console.error('Se crea el registro correctamente '+ resp);
    })
    .catch( (err) =>{
      Swal.fire({
        type: 'warning',
        title: 'Ocurrio un error al guardar',
        showConfirmButton: false,
        timer: 1500
      });

      console.error('Error al actualizar '+ err);
    });
  }

  deleteInventario(userKey: string){
    //return this.db.collection('users').doc(userKey).delete();
    return this.db.collection('inventarios').doc(userKey)
    .delete().then()
    .then( (resp) => {
      Swal.fire({
        type: 'success',
        title: 'Se registro satisfactoriamente',
        showConfirmButton: false,
        timer: 1500
      });
      console.error('Se crea el registro correctamente ' + resp);
    })
    .catch( (err) => {
      Swal.fire({
        type: 'warning',
        title: 'Ocurrio un error al guardar',
        showConfirmButton: false,
        timer: 1500
      });
      console.error('Error al actualizar ' + err);
    });
  }
}
