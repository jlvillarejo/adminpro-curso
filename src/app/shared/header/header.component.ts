import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioServ: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioServ.usuario;
  }

}
