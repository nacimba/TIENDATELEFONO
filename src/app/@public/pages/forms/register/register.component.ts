import { TYPE_ALERT } from '@shared/alerts/values.config';
import { basicAlert } from '@shared/alerts/toasts';
import { UsersService } from '@core/services/users.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { IRegisterForm, IResultRegister } from '@core/interfaces/register.interface';
import { Router } from '@angular/router';
import { EMAIL_PATTERN } from '@core/constants/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /*En el register aqui es donde añadiremos la interface IRegisterForm */
  /*ojo todos los datos de la interface son obligatorios */
  emailPattern = EMAIL_PATTERN;
  register: IRegisterForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    birthday: ''
  };
  /* con esto añadido vamos al apartado del template en el html para añadir
  las variables por template */
  constructor(private api: UsersService, private router: Router) { }

  ngOnInit(): void {
    /* procedemos a poner una fecha por defecto del calendario */
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.register.birthday = (data.toISOString()).substring(0, 10);
    console.log(this.register);
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
    console.log('register cogiendo dato', $event);
    /*usamos la funcion formatNumbers para uso de mes dia */
    const fecha = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
    this.register.birthday = fecha;

  }
  /*añadimos la función del html que llevara la info
y tendremos que añadir las propiedades para que pille el
this.register ---> poniendo arriba del constructor
register*/

  /* añadiremos register del services.ts del playgroun pero el sercices es del frondend ojo */
  add() {
    console.log('Enviando datos', this.register);
    this.api.register(this.register).subscribe((result: IResultRegister) => {
      console.log('Resultado', result);
      if (!result.status) {
        basicAlert(TYPE_ALERT.WARNING, result.message);
        return;
      }
      basicAlert(TYPE_ALERT.SUCCESS, result.message);
      /*una vez que nos registremos iremos al login */
      this.router.navigate(['/login']);
    });
  }
}
