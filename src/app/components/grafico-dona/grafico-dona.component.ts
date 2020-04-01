import { Component, OnInit, Input } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input() datos: SingleDataSet = [];
  @Input() etiquetas: Label[] = [];
  @Input() leyenda: string = '';

  public tipoGraf: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
