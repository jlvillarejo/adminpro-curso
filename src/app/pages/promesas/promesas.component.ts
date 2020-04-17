import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contar3s().then(
      // () => console.log('Terminó')
      mensaje => console.log('Terminó', mensaje)
    ).catch(error => console.error('Error en la promesa', error))

  }

  ngOnInit(): void {
  }

  contar3s(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval(() => {
        console.log(contador);

        contador += 1;

        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }

      }, 1000);
    });

  }

}
