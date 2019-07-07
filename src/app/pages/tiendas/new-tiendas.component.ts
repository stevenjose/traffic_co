import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tienda } from '../../models/tienda.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-tiendas',
  templateUrl: './new-tiendas.component.html',
  styleUrls: ['./new-tiendas.component.css']
})
export class NewTiendasComponent implements OnInit {
  public forma: FormGroup;
  public tiendasBD: any;
  public document_id;

  constructor(public db: AngularFirestore,
              public router: Router,
              public activatedRoute: ActivatedRoute)
  {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id ) {
          console.log(' id ' + id);
          this.cargarTienda( id );
      }
    });

  }

  cargarTienda( id ){
    console.log('id ' + id);
    this.document_id = id;
    this.tiendasBD = this.getTienda(id).subscribe( (resp: any) => {
      console.log('Cargando Valores' + resp.payload.data().nombre);
      this.forma.setValue({
          id,
          direccion: resp.payload.data().direccion,
          nombre:    resp.payload.data().nombre,
          tlf:       resp.payload.data().tlf
        });
    });
  }
  public getTienda(documentId: string) {
    return this.db.collection('tiendas').doc(documentId).snapshotChanges();
  }
  ngOnInit() {
    this.forma = new FormGroup({
      id: new FormControl(null),
      direccion: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required ),
      tlf: new FormControl(null, Validators.required)
    });
  }

  registarInventario() {
    if ( this.forma.invalid) {
      return;
    }

    let tienda = new Tienda(
      this.forma.value.direccion,
      this.forma.value.nombre,
      this.forma.value.tlf
    );

    if ( this.forma.value.id ) {
      console.log(this.forma.value.id + 'Id');
      this.updateTienda(tienda , this.forma.value.id).then(
        resp => {
          Swal.fire({
            type: 'success',
            title: 'Se realiza el Update satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/tiendas']);
        }
      );

    }else{
      if (this.createTienda( tienda )){
        this.router.navigate(['/tiendas']);
      }
    }


  }

  updateTienda(value: Tienda, id ) {
    console.log('cod_prod ' + id );
    return this.db.collection('tiendas').doc(id).set({
      direccion: value.direccion,
      nombre: value.nombre,
      tlf: value.tlf
    });
  }

  createTienda(value: Tienda) {

    return this.db.collection('tiendas').add({
      direccion: value.direccion,
      nombre: value.nombre,
      tlf: value.tlf
    }).then( (resp) => {
      Swal.fire({
        type: 'success',
        title: 'Se registro satisfactoriamente',
        showConfirmButton: false,
        timer: 1500
      });
      console.error('Se crea el registro correctamente '+ resp);
    })
    .catch( (err) => {
      Swal.fire({
        type: 'warning',
        title: 'Ocurrio un error al guardar',
        showConfirmButton: false,
        timer: 1500
      });
      console.error('Error al actualizar ' + err);
    });
  }


}
