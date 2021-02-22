import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { NgModule } from '@angular/core';
import { ApolloLink } from 'apollo-link';
import { HttpClientModule } from '@angular/common/http';
/*GraphqlModule para la captura de errores al realizar consultas*/


@NgModule({
  imports: [
      HttpClientModule,
      ApolloModule,
      HttpLinkModule
  ]
})
export class GraphqlModule {
 constructor(apollo: Apollo, httpLink: HttpLink) {
   // tslint:disable-next-line: max-line-length
   /*para capturar los errores de consulta y o de red error 500 esto no tiene que salirrrrrrr oji  /**desarticulizamos onError(({})) graphQLErrors?: ReadonlyArray<GraphQLError networkError?: Error  ServerError  ServerParseError;response?: ExecutionResult; */
   const errorLink = onError(({graphQLErrors, networkError})=>{
     if (graphQLErrors) {
       console.log('GraphQL Errors', graphQLErrors);
     }
     if (networkError) {
      console.log('Networkd Errors', graphQLErrors);
    }
   });
/*uri sera cuando estemos con el httplink y conectara entre api y lo nuestro*/
   const uri = 'http://localhost:2005/graphql';
   const link = ApolloLink.from(
     [
       errorLink,
       httpLink.create({uri})
     ]
   );
   apollo.create({
     link,
     cache: new InMemoryCache()
   });
 }

 }
