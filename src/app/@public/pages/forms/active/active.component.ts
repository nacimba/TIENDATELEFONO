import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  token: string;
  values: any = {
    password: '',
    passwordTwo: '',
    birthday: ''

  };
  constructor(private route: ActivatedRoute,
     private userService: UsersService,
     private router: Router) {
    this.route.params.subscribe(params => {

      this.token = params.token;
      console.log(this.token);
    });
  }

  ngOnInit(): void {
    /* procedemos a poner una fecha por defecto del calendario */
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.values.birthday = (data.toISOString()).substring(0, 10);
    console.log(this.values);
    /*vamos al @shared al calendar al datapickcer y modificamos en
     el componente del piker y listooo mirarloo para que se muestr
    una fecha en la pantalla verlo en NgbDateStruct ojjooo */

  }
  /*tenemos que dar dformato a lo del piker para tratar la fecha
  tenemos un objeto de año mes dia y pasarlo a string con su formato
  tenemos que crear una funcion privada para tratar eso */
  private formatNumbers(num: number | string) {
    /*esto es para dar fomato el objeto al string */
    return (+num < 10) ? `0${num}` : num;
  }
  dataAsign($event) {
    console.log('Activar cogiendo dato', $event);
    /*usamos la funcion formatNumbers para uso de mes dia */
    const fecha = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
    console.log(fecha);
    this.values.birthday = fecha;

  }
  add() {
console.log(this.values);
if(this.values.password !== this.values.passwordTwo){

  basicAlert(TYPE_ALERT.WARNING,'Las contraseñas no coinciden y no es válido para activar el usuario. Asegurate que las contraseñas son iguales')
return;
}

// todo validado vamos a enviarlo a la api de graphql
// servicio =>  active

this.userService.active(this.token, this.values.birthday, this.values.password).subscribe(

  result => {
    console.log(result);
    if (result.status){
      basicAlert(TYPE_ALERT.SUCCESS, result.massage);
      //redireccionar al login
      this.router.navigate(['login']);
      return;

    }
    basicAlert(TYPE_ALERT.WARNING, result.massage);
          }
        );
      }
    }
