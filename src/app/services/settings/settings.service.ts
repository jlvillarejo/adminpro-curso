import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaURL: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.leerAjustes();
  }

  guardarAjustes() {

    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));

  }

  leerAjustes() {

    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }

  }

  aplicarTema(color: string) {

    const url = `assets/css/colors/${color}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = color;
    this.ajustes.temaURL = url;
    this.guardarAjustes();

  }

}

interface Ajustes {
  temaURL: string;
  tema: string;
}
