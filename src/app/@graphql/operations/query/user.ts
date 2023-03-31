import { USER_FRAGMENT } from '@graphql/operations/fragment/user';
import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/result-info';

export const LOGIN_QUERY = gql`
query getlLogin($email: String!, $password: String!, $include: Boolean!){
    login(email: $email, password: $password){
      status
      message
      token
       user {
    ...UserObject
    }
    }
}

${ USER_FRAGMENT }
`;
/* Se corresponde a la lista de usuarios ojo acordarse del fragment que es un objeto y lo tenemos que incluir lo definiremos en api.ser...*/
export const USERS_LIST_QUERY = gql`
query userList($include: Boolean!, $page: Int, $itemsPage: Int){
  users (page: $page, itemsPage: $itemsPage) {
    info{
      ...ResultInfoObject
    }
    status
    message
    users {
    ...UserObject
    }
  }
}

${ USER_FRAGMENT }
${ RESULT_INFO_FRAGMENT }
`;

/*ojo el USER_FRAGMENT ES EL FRAGMENTO ENTERO DEL USUARIO */
/*consulta para obtener datos de usuario con token jwt */
/*{
  me{
    status
    message
    user{
      id
      name
      email
    }
  }
}*/
/*mirara abajo y luego ir al api.servicio para pillarlo cn el backed */
/*  OJO EL USER_FRAGMENT sustituye a
      name
      lastname
      email  ver los ... tres puntos ...UserObject*/
export const ME_DATA_QUERY = gql `
query meData($include: Boolean! ){
 me{
    status
    message
    user{
      ...UserObject
    }
 }
}
${ USER_FRAGMENT }
`;
/*una vez realizado esto vamos al apiservice  en services*/
