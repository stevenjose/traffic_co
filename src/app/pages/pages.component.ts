import { Component, OnInit } from '@angular/core';
import 'datatables.net';
//declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }
  public tableWidget: any;

  ngOnInit() {
    //init_plugins();
  }

}
