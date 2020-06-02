import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  usuarioIn: string;

  auth2: any;

  constructor(public router: Router,
    public _usuarioServ: UsuarioService) { }

  ngOnInit(): void {

    init_plugins();
    this.googleInit();

    this.usuarioIn = localStorage.getItem('usuarioIn') || '';
    if (this.usuarioIn.length >= 1) {
      this.recuerdame = true;
    }

  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '214850903693-a0gp2ue6laalfqqc7qt09rj06eeka38q.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {}, (googleUsr) => {

      // let profile = googleUsr.getBasicProfile();

      const tokenG = googleUsr.getAuthResponse().id_token;

      this._usuarioServ.loginGoogle(tokenG)
        .subscribe(() => this.router.navigate(['/dashboard']));
    });
  }

  iniciar(formulario: NgForm) {

    if (formulario.invalid) {
      return;
    }

    let usr = new Usuario(null, null, formulario.value.email, formulario.value.password);

    this._usuarioServ.login(usr, this.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));

    // this.router.navigate(['/']);
  }

}
