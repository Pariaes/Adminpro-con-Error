import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any [];
  usuario:any = Usuario;  


  constructor( private _sidebarService: SidebarService, private _usuarioService:UsuarioService) {
    this.menuItems = this._sidebarService.menu;
    this.usuario = this._usuarioService.usuario;
  }  
  
  
}
