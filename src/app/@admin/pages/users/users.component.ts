import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { optionsWithDetails, userFormBasicDialog } from '@shared/alerts/alerts';
import { UsersAdminService } from './users-admin.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { ACTIVE_FILTERS } from '@core/constants/filters';

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
  filterActiveValues = ACTIVE_FILTERS.ACTIVE;
  constructor(private service: UsersAdminService){}

  ngOnInit(): void {
    this.context = {};
    /*aqui se pone el valor de cuantos elementos tienen que salir en la tabla de lista de usuarios en el menu de User que est debajo de DASHBOARDD PILAS  */
    this.itemsPage = 10;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users'
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
      },
      {
        property: 'active',
        label: '¿Activo?'
      }

    ];

  }
  private initializeForm(user: any) {
    const defaultName = 
    user.name !== undefined && user.name !== '' ? user.name : '';
    const defaultLastname = 
    user.lastname !== undefined && user.lastname !== '' ? user.lastname : '';
    const defaultEmail = 
    user.email !== undefined && user.email !== '' ? user.email : '';
    const roles = new Array(2);
    roles[0] = user.role !== undefined && user.role === 'ADMIN' ? 'selected' : '';
    roles[1] = user.role !== undefined && user.role === 'CLIENT' ? 'selected' : '';
    return `
  <input id="name" value="${defaultName}" class="swal2-input" placeholder="Nombre" required>
  <input id="lastname" value="${defaultLastname}" class="swal2-input" placeholder="Apellidos" required>
  <input id="email" value="${defaultEmail}" class="swal2-input"  placeholder="Correo electrónico" required>
  <select id="role" class="swal2-input">
  <option value="ADMIN" ${roles[0]}>Administrador</option>
  <option value="CLIENT"${roles[1]}>Cliente</option>
 
   
    </select>
  `;
  }
  async takeAction($event) {
    //Coger la información para las acciones
    /*la posición 0 es el de info*/
    const action = $event[0];
    /*la posición 1 es de el bloque de datos de usuario nombre apellido*/
    const user = $event[1];
    const html = this.initializeForm(user);
    switch (action) {
      case 'add':
        //Añadir el item

        this.addForm(html);
        break;

      case 'edit':
        this.updateForm(html, user);
        break;

      case 'info':

        const result = await optionsWithDetails(
          'Detalles',
          `${user.name} ${user.lastname}<br/>
          <i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;${user.email}`,
          (user.active !== false ) ? 375:400 ,
          '<i class="fas fa-edit"></i>Editar',    // true
          (user.active !== false ) 
          ? '<i class="fas fa-lock"></i>Bloquear' 
          : '<i class="fas fa-lock-open"></i>Desbloquear'
          
        ); //false
        if (result) {//si el resultado es falso queremos bloquear
          this.updateForm(html, user);
        } else if (result === false) {
          this.unblockForm(user, (user.active !== false) ? false : true);
        }
        break;

      case 'block':
       this.unblockForm(user, false);
        break;
        case 'unblock':
       this.unblockForm(user, true);
        break;
      default:
        break;

    }
  }

  private async addForm(html: string) {

    const result = await userFormBasicDialog('Añadir usuario', html);
    console.log(result);
    this.addUser(result);

  }

  private addUser(result){
  if (result.value){
    const user: IRegisterForm = result.value;
    user.password ='1234';
    user.active = false;
    this.service.register(user).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          this.service.sendEmailActive(res.user.id, user.email).subscribe(
            resEmail => {
              (resEmail.status) ?
              basicAlert(TYPE_ALERT.SUCCESS, resEmail.message):
              basicAlert(TYPE_ALERT.WARNING, resEmail.message);
            }
          );
          
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
  }
  }
private async updateForm(html: string, user: any){
  const result = await userFormBasicDialog('Modificar usuario', html);
  console.log(result);
  this.updateUser(result, user.id);
}

private updateUser(result, id: string){
  if (result.value){
    const user = result.value;
    user.id = id;
    console.log(user);
    this.service.update(result.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
  }
  }


  private async unblockForm(user: any, unblock: boolean  ) {
    const result =(unblock) ?
     await optionsWithDetails(
      '¿Desbloquear?', `Si desbloqueas el usuario seleccionado, se mostrará en la lista y podrás hacer compras .`, 500,
      'No, no desbloquear',
      'Si, desbloquear'
      ):
      await optionsWithDetails(
        '¿Bloquear?', `Si bloqueas el usuario seleccionado, no se mostrará en la lista.`, 430,
        'No, no bloquear',
        'Si, bloquear'
        )

    if (result === false) {
      //si el resultado es falso queremos bloquear /desbloquear
      //this.blockUser(user.id);
      this.unblockUser(user.id, unblock, true);
    }
  }
  private unblockUser(id: string, unblock: boolean = false, admin: boolean = false){
    this.service.unblock(id, unblock, admin).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });

  }
}
