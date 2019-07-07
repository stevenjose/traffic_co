import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { AngularFirestore} from '@angular/fire/firestore';
declare function init_plugins();
import * as $ from 'jquery';
import 'datatables.net';
import { map } from 'rxjs/operators';
import { Producto } from '../../models/producto.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  title: string = 'Table Productos';
  productoServ = ProductoService;
  public tableWidget: any;
  public productosBD: any;
  constructor(  public producServ: ProductoService,
                public db: AngularFirestore ) {

    //this.productosBD = db.collection('productos').valueChanges();
    this.productosBD = db.collection('productos').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));



  }

  ngOnInit() {
    init_plugins();
  }

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
        this.deleteProducto(id);
        Swal.fire(
          'Eliminado!',
          'El regsitro de se ha eliminado.',
          'success'
        )
      }
    });
  }

  deleteProducto(userKey){
    console.log(userKey);
    return this.db.collection('productos')
    .doc(userKey)
    .delete().then()
    .then( (resp) => {
    }, err =>{
        console.log('error', err);
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
