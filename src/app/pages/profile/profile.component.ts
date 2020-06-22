import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioServ: UsuarioService) {
    this.usuario = this._usuarioServ.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario) {

    // actualizamos el objeto usuario con los valores recibidos
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    // Actualizamos la base de datos con los nuevos valores con usuarioService
    this._usuarioServ.actualizarUsuario(this.usuario)
      .subscribe();

  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imágenes', 'Debe seleccionar un archivo de tipo imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this._usuarioServ.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
