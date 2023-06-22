import { Component } from '@angular/core';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1: string [] = [ 'Pan', 'Refrescos', 'Tacos' ];
  public data1 = {
    labels: this.labels1, 
    datasets: [
      {
        label: 'SALES',
        data: [ 10, 20, 40 ],
        backgroundColor: [
          '#6857E6','#009FEE','#F02059'
        ]
      }
    ]
  }

  
  
  
  
}
