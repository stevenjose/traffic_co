import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
declare function init_plugins();
import * as $ from 'jquery';
import 'datatables.net';
declare function init_plugins();

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  public title: string = 'Table Proveedores';
  public tableWidget: any;
  constructor(public proveedorServ: ProveedorService) { }

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
