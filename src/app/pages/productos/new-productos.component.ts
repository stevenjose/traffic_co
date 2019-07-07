import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-productos',
  templateUrl: './new-productos.component.html',
  styleUrls: ['./new-productos.component.css']
})
export class NewProductosComponent implements OnInit {

  public forma: FormGroup;
  public document_id;
  public productoBD;
  constructor( public db: AngularFirestore,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {

    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id ) {
          console.log(' id ' + id);
          this.cargarProducto( id );
      }
    });

  }

  cargarProducto( id ){
    this.document_id = id;
    this.productoBD = this.getProducto(id).subscribe( (resp: any) => {
      console.log('Cargando Valores' + resp.payload.data().nombre);
      this.forma.setValue({
          id,
          categoria: resp.payload.data().categoria,
          cod:    resp.payload.data().cod,
          titulo:       resp.payload.data().titulo
        });
    });
  }

  getProducto(id){
    return this.db.collection('productos').doc(id).snapshotChanges();
  }

  ngOnInit() {
    this.forma = new FormGroup({
      id: new FormControl(null),
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

   /* if (this.createProducto(producto)){
     this.router.navigate(['/productos'])
   }; */
    if ( this.forma.value.id ) {
    this.updateProducto(producto , this.forma.value.id).then(
      resp => {
        Swal.fire({
          type: 'success',
          title: 'Se realiza el Update satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/productos']);
      }
    );

  } else {
    if (this.createProducto( producto )){
      this.router.navigate(['/productos']);
    }
  }

 }
 updateProducto(value: Producto, id){
  return this.db.collection('productos').doc(id).set({
    categoria: value.categoria,
    cod: value.cod,
    titulo: value.titulo
  });

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
