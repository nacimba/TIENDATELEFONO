import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { ITableColumns } from '@core/interfaces/table-columns.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

query: DocumentNode = USERS_LIST_QUERY;
context: object;
itemsPage: number;
resultData: IResultData;
include: boolean;
/**propiedad columns para que se vea la tabla de forma dinamica */
columns: Array<ITableColumns>;
  ngOnInit(): void {
    this.context = {};
    /*aqui se pone el valor de cuantos elementos tienen que salir en la tabla de lista de usuarios en el menu de User que est debajo de DASHBOARDD PILAS  */
    this.itemsPage = 10;
    this.resultData = {
      listKey: 'users',
    definitionKey:'users'
    };
    this.include = true;
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre'
      },
      {
        property: 'lastname',
        label: 'Apellidos'
      },
      {
        property: 'email',
        label: 'Correo electrónico'
      },
      {
        property: 'role',
        label: 'Permisos'
      }
      
    ];
  
  }

}
