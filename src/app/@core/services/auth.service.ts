import { Injectable } from '@angular/core';
import { ApiService } from './../../@graphql/services/api.service';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';
import { HttpHeaders } from '@angular/common/http';
import { ISession, IMeData } from '@core/interfaces/session.interface';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
/*tratamiento de los observables subjects elemento para ver el menu del navbar en funcion del ususario */
accesVar = new Subject<IMeData>();

/*convertimos en observable ccessVar$ que sera la propiedad cuando queramos acceder a la información */
accessVar$ = this.accesVar.asObservable();

/*el super es para añadir a los metodos de su padre */
  constructor(apollo: Apollo) {
    super(apollo);
  }
/*creamos nueva funcion para gestionar los cambios las actualizaciones */
updateSession(newValue: IMeData){
    this.accesVar.next(newValue);
  }
  /*creando una función para la sesion con interfaz*/
  start() {
    if (this.getSession() !== null) {
      this.getMe().subscribe((result: IMeData) => {
        if (!result.status) {
          /*si no existe resultado borrar la session la función  resetSession() la creamos abajo
          como ya tenemos la funcion startt()la usaremos donde queramos desde componente del login*/
          this.resetSession();
          return;
        }
        /*gestionamos para la actualización  */
        this.updateSession(result);

      });
      console.log('Sesión iniciada');
      return;
    }
    this.updateSession({
      status: false
    });
    console.log('Sesión no iniciada');
  }

  login(email: string, password: string) {

    /*es lo que se va a devolver esto es de la query del playground*/
    return this.get(LOGIN_QUERY, { email, password, include: false }).pipe(
      map((result: any) => {
        return result.login;
      })
    );
  }
  /*Lo de arriba ya lo tenemos y vamos a consumirlo desde el componente home */
  /*es decir lo inyectamos en el componente.ts de home por ejemplo */
  /*Añadimos la lista de usuarios */
  /*getUsers(){}, con el  return this.apollo lo inyectamos*/
  /* ojo para consumir este getUser dentro del fronten pues lo llevamos el getUsers al frondend en este caso ejemplo home de   */
  /*lo publico en inicio sesion en el componente de home ;)*/

  /*autentificación por token ojo watchQuery para añadir las consultas */
  getMe() {
    return this.get(ME_DATA_QUERY, {
      include: false
    },
      {
        headers: new HttpHeaders({
          /*añadimos una interface para lo de la funcion getSession de pasar un strin a objeto */
          Authorization: (this.getSession() as ISession).token
        })

      }).pipe(map((result: any) => {
        return result.me;
      }));
  }
  setSession(token: string, expiresTimeInHours = 24) {
    /*la constante nos da la fecha y hora actual */
    const date = new Date();
    console.log('fecha y hora', date.toISOString());
    date.setHours(date.getHours() + expiresTimeInHours);

    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token
    };
    console.log(session);
    /*para almacenarlo lo tenemos que convertir de objeto a strin con JSON */
    localStorage.setItem('session', JSON.stringify(session));
  }
  /*añadimosISession para que devuelva tipo de datos donde lo usemos*/
  getSession(): ISession {
    /*devolvemos lo que cargamos en el localStorage, parse es el efecto de descodificar
    antes pasamos un objeto a string ahora un string a objeto */
    return JSON.parse(localStorage.getItem('session'));
  }


  resetSession() {
    localStorage.removeItem('session');
    this.updateSession({ status: false });
  }
}
