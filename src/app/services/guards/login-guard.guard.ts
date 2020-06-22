import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): boolean {

    // console.log('Paso por el loginGuard');

    if (this._usuarioService.autenticado()) {
      // console.log('Autenticado');
      return true;
    } else {
      // console.log('No autenticado');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
