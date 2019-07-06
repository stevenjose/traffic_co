import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto.model';


@Component({
  selector: 'app-new-productos',
  templateUrl: './new-productos.component.html',
  styleUrls: ['./new-productos.component.css']
})
export class NewProductosComponent implements OnInit {
  public forma: FormGroup;
  constructor( public db: AngularFirestore, public router: Router ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      categoria: new FormControl(null, Validators.required ),
      cod: new FormControl(null, Validators.required),
      titulo: new FormControl(null, Validators.required),
    });
  }

  registarProducto(){
    if( this.forma.invalid){
     return;
   }

   let producto = new Producto(
     this.forma.value.cod,
     this.forma.value.categoria,
     this.forma.value.titulo
   );

   //console.log(this.forma);

   if (this.createProducto(producto)){
     this.router.navigate(['/productos'])
   };


 }

 createProducto(value: Producto){
  console.log(value);
  return this.db.collection('productos').add({
    cod: value.cod,
    categoria: value.categoria,
    titulo: value.titulo
  });
}

}
