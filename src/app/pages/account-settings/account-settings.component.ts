import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustesServ: SettingsService) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarTema(color: string, link: ElementRef) {

    this.aplicarCheck(link);
    this._ajustesServ.aplicarTema(color);

  }

  aplicarCheck(elemento: any) {

    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores) {
      ref.classList.remove('working');
    }

    elemento.classList.add('working');

  }

  colocarCheck() {

    let selectores: any = document.getElementsByClassName('selector');

    let tema = this._ajustesServ.ajustes.tema;

    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
