import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import * as $ from 'jquery';
import 'datatables.net';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Tienda } from 'src/app/models/tienda.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {
  public title = 'Table Tiendas';
  public tableWidget: any;
  public tiendasBD: any;
  // tslint:disable-next-line:variable-name
  constructor(public _tiendasServi: TiendaService,
              public db: AngularFirestore) { }


  ngOnInit() {

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
        this.deleteTienda(id);
        Swal.fire(
          'Eliminado!',
          'El regsitro de se ha eliminado.',
          'success'
        )
      }
    });
  }

  deleteTienda(userKey) {
    //console.log(userKey);
    return this.db.collection('tiendas')
    .doc(userKey)
    .delete().then()
    .then( (resp) => {
    }, err => {
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

