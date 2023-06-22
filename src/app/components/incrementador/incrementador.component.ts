import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{
  
  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass}`
  }

  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';


  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  
  cambiarValor (valor: number) {

    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );

    if( this.progreso >= 100 && valor >=0 ) {
      this.valorSalida.emit(100);
      this.progreso = 100;
    }
    
    if( this.progreso <= 0 && valor <0 ) {
      this.valorSalida.emit(0);
      this.progreso = 0;
    }
        
  }

  onChange( nuevoValor: number ) {

    if ( nuevoValor >=100 ) {
      this.progreso = 100;
    }else if ( nuevoValor <=0 ) {
      this.progreso = 0
    }else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit(this.progreso);
  }

}
