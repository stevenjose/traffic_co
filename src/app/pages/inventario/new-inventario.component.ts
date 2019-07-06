import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Inventario } from '../../models/inventario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-inventario',
  templateUrl: './new-inventario.component.html',
  styleUrls: ['./new-inventario.component.css']
})

export class NewInventarioComponent implements OnInit {
  public forma: FormGroup;
  constructor( public db: AngularFirestore, public router: Router) { }

  ngOnInit() {
    this.forma = new FormGroup({
      cod_prod: new FormControl(null, Validators.required ),
      id_tienda: new FormControl(null, Validators.required),
      stock: new FormControl(null, Validators.required),
    });


  }
  registarInventario(){
     if( this.forma.invalid){
      return;
    }
    console.log('inventarioModel');

    let inventario = new Inventario(
      this.forma.value.cod_prod,
      this.forma.value.id_tienda,
      this.forma.value.stock
    );

    //console.log(this.forma);

    if (this.createInventario(inventario)){
      this.router.navigate(['/inventario'])
    };


  }

  createInventario(value: Inventario){
    console.log(value.codProd);
    return this.db.collection('inventarios').add({
      cod_prod: value.codProd,
      id_tienda: value.idTienda,
      stock: value.stock
    });
  }
}
