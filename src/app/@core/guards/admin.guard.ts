
import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { getLocaleTimeFormat } from '@angular/common';
/*decodificamos el token trayendonos las dependewncias jwt para reguar*/
const jwtDecode = require('jwt-decode');

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  /*añadimos un constructor para añadir un servicio en este caso de autentificación*/
  constructor(private auth: AuthService, private router: Router) { }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    /*primero tenemos que controlar que existe sesión localestorage*/
    if (this.auth.getSession() !== null) {
      console.log('Estamos logeados');
      const dataDecode = this.decodeToken();
      console.log(dataDecode);

      /*comprobar que no esta caducado el token*/
      if (dataDecode.exp < new Date().getTime() / 1000) {
        console.log('Sesión caducada');
        /*esto nos lleva a que cuando caduque la sesion nos redireccione al login*/
        return this.redirect();
      }
      /* el rol del usuario es admin ojo el dataDecode es el objeto que tendra el user*/
      if (dataDecode.user.role === 'ADMIN') {
        console.log('Somos administradores, solo accederan al admin los administradores');
        return true;
      }
      console.log('No somos administradores');
      /*el true le da acceso al children y el false le quita el acceso lo protege */
    }
    console.log('Sessión no iniciada');
    return this.redirect();
  }
  /** Creamos nueva funcion */
  redirect() {
    this.router.navigate(['/login']);
    return false;
  }
  /*creamos una nueva funcion para decodificar jwtDecode*/
  decodeToken() {
    return jwtDecode(this.auth.getSession().token);
  }

}
