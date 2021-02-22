/*añadiremos la lista de usuarios en forma de objeto para usarlo mas veces */
import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
fragment UserObject on User {
name
lastname
password @include (if:$include)
email
registerDate @include (if: $include)
birthday @include (if: $include)
role
}
`;
