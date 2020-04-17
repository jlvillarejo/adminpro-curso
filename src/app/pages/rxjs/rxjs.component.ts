import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscripcion: Subscription;

  constructor() {

    // let contador = 0;

    this.suscripcion = this.getObesrvable()
      .subscribe(
        valor => console.log('Subs', valor),
        error => console.log('Error en el observable', error),
        () => console.log('El observable terminó!')
      )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    console.log('Se va a abandonar la página rxjs');
    this.suscripcion.unsubscribe();

  }


  getObesrvable(): Observable<any> {

    let contador = 0;

    return new Observable((observer: Subscriber<any>) => {

      const intervalo = setInterval(() => {

        contador++;

        const salida = {
          valor: contador
        }

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   console.log("error");
        //   clearInterval(intervalo);
        //   observer.error('help');
        // }

      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        return ((valor % 2) === 1);
      })
    );

  }

}
