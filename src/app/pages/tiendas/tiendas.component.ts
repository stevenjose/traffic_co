import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {
  public title = 'Table Tiendas';

  // tslint:disable-next-line:variable-name
  constructor(public _tiendasServi: TiendaService) { }


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
