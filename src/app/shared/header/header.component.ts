import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  usuario:any = Usuario;


  constructor( private _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  logout() {
  
    this._usuarioService.logout();
  
  }
}
