import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//declare function init_plugins();
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  public title: string = 'Table Proveedores';
  dtOptions: DataTables.Settings = {};
  tableWidget: any;
  public provedorBD: Observable<any>;
  dtTrigger: Subject<any> = new Subject();

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
                  this.provedorBD.subscribe( async (resp) =>{
                    console.log(resp);
                    if(resp.id != ""){
                      setTimeout( resp => {
                        this.initDatatable();
                      },200) ;
                    }
                  });

  }



  ngOnInit() {
    console.log('ngOnInit -');
  }

  ngAfterViewInit() {

  }

  initDatatable(){
    console.log('Init Table');
    let exampleId: any = $('#myTable');

    this.tableWidget = exampleId.DataTable();
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
