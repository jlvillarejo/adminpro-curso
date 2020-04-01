import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  @Input('titulo') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioPorcentaje: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChanges(newValor: number) {
    // console.log(newValor);
    // console.log(this.txtProgreso);

    // let elementoHTML: any = document.getElementsByName('porcentaje')[0];


    if (newValor <= 0) {
      this.porcentaje = 0;
    } else if (newValor > 100) {
      this.porcentaje = 100;
    } else {
      this.porcentaje = newValor;
    }

    // elementoHTML.value = this.porcentaje;
    this.txtProgreso.nativeElement.value = this.porcentaje;

    this.cambioPorcentaje.emit(this.porcentaje);

  }

  cambiarValorPB(valor: number) {
    // console.log(valor);

    if ((this.porcentaje > 0) && (valor < 0)) {

      this.porcentaje = this.porcentaje + valor;
      if (this.porcentaje < 0) {
        this.porcentaje = 0;
      }

    }
    else {
      if ((this.porcentaje < 100) && (valor > 0)) {
        this.porcentaje = this.porcentaje + valor;
        if (this.porcentaje > 100) {
          this.porcentaje = 100;
        }
      }
    }

    this.cambioPorcentaje.emit(this.porcentaje);
    // console.log('constructor-porcentaje', this.porcentaje);
    this.txtProgreso.nativeElement.focus();

  }



}
