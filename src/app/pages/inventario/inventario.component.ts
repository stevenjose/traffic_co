import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor( public _inventarioServi: InventarioService) { }
  public title = 'Table Inventario';
  public tableWidget: any;
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


}
