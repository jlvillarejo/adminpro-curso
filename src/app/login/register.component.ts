import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../services/services.index';

import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(public _usuarioServ: UsuarioService,
    public _router: Router) { }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      };

      return {
        sonIguales: true
      };


    };

  }

  ngOnInit(): void {
    init_plugins();

    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

    this.formulario.setValue({
      nombre: 'Prueba',
      apellidos: 'PruebaApe1 PruebaApe2',
      correo: 'prueba@angular.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    })
  };



  registrarUsuario() {

    if (this.formulario.invalid) {
      return;
    }

    if (!this.formulario.value.condiciones) {
      console.log('Debe de aceptar las condiciones');
      swal("Importante!", "Debe aceptar las condiciones!", "warning");
      return;
    }

    let usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.apellidos,
      this.formulario.value.correo,
      this.formulario.value.password
    );

    this._usuarioServ.crearUsuario(usuario)
      // .subscribe(resp => {
      //   console.log(resp);
      //   this._router.navigate(['/login']);
      // });
      .subscribe(resp => this._router.navigate(['/login']));
  }
}
