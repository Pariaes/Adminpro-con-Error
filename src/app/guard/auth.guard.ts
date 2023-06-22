import { inject } from "@angular/core";
import { Router, type CanActivateFn, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";
import { Observable, tap } from "rxjs";







export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>{
        const router = inject(Router);
        const _usuarioService = inject(UsuarioService);
        
        let token = _usuarioService.token
        if(token){
            _usuarioService.validarToken().subscribe(resp => console.log(resp))
            return true
        }else {
            router.navigateByUrl('/login');
            return false
        }                   

}