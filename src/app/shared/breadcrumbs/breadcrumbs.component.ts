import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  titulo: string = '';
  tituloSubs$: Subscription;


  constructor( private router:Router) {
    
    this.tituloSubs$ = this.getArgumentosRuta()
                           .subscribe( data => {
                              this.titulo = data['titulo']
    })
    
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter( Event => Event instanceof ActivationEnd && Event.snapshot.data ['titulo']
      ),
      map( (Event) => {
        const event = Event as ActivationEnd;
        return event.snapshot.data;
      })
    )
  }

}
