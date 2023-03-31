import { LOGIN_QUERY, USERS_LIST_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { DocumentNode } from 'graphql';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { REGISTER_USER } from '@graphql/operations/mutation/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
/*inyectamos apolo */
  constructor(private apollo: Apollo) { }
  /*Añadir metodos para consumir la info de la API*/
  /*fincion de inicio seción donde introduciremos un email y passwd en el frontend */
/*VAOMS A CREAR UNA FUNCION MADRE */

protected get(query: DocumentNode, variables: object = {}, context: object = {} ) {
  return this.apollo.watchQuery({
    query,
    variables,
    context,
    fetchPolicy: 'network-only'
  }).valueChanges.pipe(map((result) =>{
     return result.data;
  }));
}
protected set(mutation: DocumentNode, variables: object = {}, context: object = {}){
  return this.apollo.mutate({
   mutation,
    variables,
    context,
  }).pipe(map((result) =>{
     return result.data;
  })
  );
  }
}


  /*es para las operaciones mutation registro de usuarios */
  /** */

/* pillamos la función registro vamos al componente del registro ojoooooooooooo y lo pegamos */

/*resto lo ponenmos en el apartado sercicios  en core services*/
/*pillamos el objeoto getMe y lo podemos usar en el frondend en el homecomponent por ejem */