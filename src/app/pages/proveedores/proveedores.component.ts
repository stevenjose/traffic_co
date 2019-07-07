import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
declare function init_plugins();
import * as $ from 'jquery';
import 'datatables.net';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Proveedor } from 'src/app/models/proveedor.model';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  public title: string = 'Table Proveedores';
  public tableWidget: any;
  public provedorBD: any;

  constructor(public db: AngularFirestore,
              public router: Router,
              public activatedRoute: ActivatedRoute) {

              this.provedorBD = this.db.collection('proveedores').snapshotChanges().pipe(
                  map(actions => {
                    return actions.map(a => {
                      const data = a.payload.doc.data() as Proveedor;
                      const id = a.payload.doc.id;
                      return { id, ...data };
                    });
                  }));

  }



  ngOnInit() {
    init_plugins();
    console.log('ngInit');
  }

  ngAfterViewInit() {
    //this.initDatatable();
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

  delete(id) {

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

  deleteProducto(userKey) {
    console.log(userKey);
    return this.db.collection('proveedores')
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
