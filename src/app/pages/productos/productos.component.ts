import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import 'datatables.net';
declare function init_plugins();
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

    this.productosBD = db.collection('productos').valueChanges();

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

}
