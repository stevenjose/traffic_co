import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  public inventariosBD: Observable<any[]>;
  constructor( public _inventarioServi: InventarioService,
               public db: AngularFirestore) {
    //console.log('Inventario');
    this.inventariosBD = db.collection('inventarios').valueChanges();

  }
  public title = 'Table Inventario';
  public tableWidget: any;
  ngOnInit() {
    //this.createInventario('');
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

  createInventario(value){
    console.log('Crear Inventario');
    return this.db.collection('inventarios').add({
      cod_prod: '004',
      id_tienda: '004',
      stock: '25'
    });
  }

}
