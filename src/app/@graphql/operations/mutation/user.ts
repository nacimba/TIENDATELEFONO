import { USER_FRAGMENT } from '@graphql/operations/fragment/user';
/* al importar nos dara algo como {gql} dejarlo sin {} */
import gql from 'graphql-tag';
/* nos vaasamos en el playground de nuestro backend
mutation addUser($user: UserInput!) {
    register(user: $user) {
      status
      message
      user {
        id
        name
        lastname
        password
        email
        registerDate
        birthday
      }
    }
  }*/
/* ojo el gql es la consulta  y vasandonos en lo de arriba obtendremos esto UserObject
tendremos el fragmente pero esto lo tenemos que añadir fuera de 
 mutation ver ${ USER_FRAGMENT }*/
export const REGISTER_USER = gql`
  mutation addUser($user: UserInput!, $include: Boolean! ){
      register(user: $user){
          status
          message
          user {
              ...UserObject
          }
      }
  }
  ${ USER_FRAGMENT}
  `;
/*con esto realizado tendremos que ir al servicio de la api.service en el
frontend*/

export const UPDATE_USER = gql`
  mutation updateUser($user: UserInput!, $include: Boolean! ){
    updateUser(user: $user){
          status
          message
          user {
              ...UserObject
          }
      }
  }
  ${ USER_FRAGMENT}
  `;


  export const BLOCK_USER = gql`
  mutation blockUser($id: ID!, $unblock: Boolean, $admin: Boolean){
    blockUser(id: $id, unblock: $unblock, admin: $admin){
          status
          message
       
      }
  }
  `;

  export const ACTIVE_EMAIL_USER = gql`
  mutation activarUsuarioEmail($id: ID!, $email: String!){
    activeUserEmail( id: $id, email: $email){
      status
      message
    }
  }
  `;

  export const ACTIVE_USER = gql`
  
  mutation activeUser($id: ID!, $birthday: String!, $password: String!){
    activeUserAction(
      id: $id,
      birthday: $birthday,
      password: $password
      
      ){
      status
      message
      }
  }
  `;