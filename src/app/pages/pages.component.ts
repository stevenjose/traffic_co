import { Component, OnInit } from '@angular/core';
declare function init_plugins();
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }
  public tableWidget: any;

  ngOnInit() {
    init_plugins();
  }

}
