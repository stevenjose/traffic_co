import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import 'datatables.net';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Inventario } from '../../models/inventario.model';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  public inventariosBD: any;

  constructor( public _inventarioServi: InventarioService,
               public db: AngularFirestore) {
    //console.log('Inventario');
    this.inventariosBD = db.collection('inventarios').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Inventario;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
  }


  public title = 'Table Inventario';
  public tableWidget: any;
  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout( (resp =>{
      this.initDatatable();
    }), 1000);

  }

  initDatatable(){
    console.log('Init Table');
    let exampleId: any = $('#myTable');
    this.tableWidget = exampleId.DataTable({
      select: true
    });
  }

  createInventario(value){
    console.log('Crear Inventario');
    return this.db.collection('inventarios').add({
      cod_prod: '004',
      id_tienda: '004',
      stock: '25'
    })
    .then()
    .catch();
  }

  delete(id){
    Swal.fire({
      title: 'Esta seguro?',
      text: "Quiere eliminar el registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        this.deleteInventario(id);
        Swal.fire(
          'Eliminado!',
          'El regsitro de se ha eliminado.',
          'success'
        )
      }
    });
  }

  deleteInventario(userKey: any){

    console.log(userKey);
    return this.db.collection('inventarios')
    .doc(userKey)
    .delete().then()
    .then( (resp) => {
    }, err =>{
        console.log('error');
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
