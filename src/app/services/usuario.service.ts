import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interfece';
import { environment } from 'src/environments/environments';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.models';

declare const google: any;
//declare const gapi: any;


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //auth2: any;
   public usuario!: Usuario;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone) { 

    //this.googleInit();
  }

  get token (): string {
    return localStorage.getItem('token') || '';
  }

  get uid (): string {
    return this.usuario.uid || ''
  }

  /*googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }*/

  logout() {
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('pacocantos@gmail.com', () => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken(): Observable<boolean> {
    
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
        map( (resp:any) => {
          const { email, google, nombre, role, img = '', uid } = resp.usuario;
          this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
          localStorage.setItem('token', resp.token);
          console.log(this.usuario);
          return true;
        }),
        catchError( error => of(false))
        
    );
  }

  crearUsuario( formData: RegisterForm) {
    
    return this.http.post(`${ base_url }/usuarios`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('token', resp.token)
                    })
    )
  }

  actualizarPerfil( data: {email: string, nombre:string, role: string } ): any {
    data = {
      ...data,
      role: this.usuario.role as string
    };

    this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  login( formData: LoginForm) {
    
    return this.http.post(`${ base_url }/login`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
  }

  loginGoogle (token: string) {
    return this.http.post(`${ base_url }/login/google`, {token})
                    . pipe(
                      tap ( (resp:any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
  }

}
