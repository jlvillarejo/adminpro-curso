import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UploadFilesService } from '../upload-files/upload-files.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFile: UploadFilesService
  ) {

    this.cargarStorage();
  }

  autenticado() {
    return (this.token.length > 0);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));

  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('usuarioIn', usuario.email);
    } else {
      localStorage.removeItem('usuarioIn');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;

      }));

  }


  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/user';

    return this.http.post(url, usuario).pipe(map((resp: any) => {
      swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    })
    );

  }

  actualizarUsuario(usuarioIN: Usuario) {

    let url = URL_SERVICIOS + '/user/' + usuarioIN._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuarioIN)
      .pipe(map((resp: any) => {
        const userDB = resp.usuario;

        this.guardarStorage(userDB._id, this.token, userDB);
        swal('Usuario actualizado', userDB.nombre, 'success');

        return true;
      }));

  }

  cambiarImagen(file: File, id: string) {

    this._uploadFile.uploadFile(file, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');

        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);
        swal('Error al modificar la imagen', this.usuario.nombre, 'error');
      });
  }

}
