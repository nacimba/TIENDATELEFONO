import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Component } from '@angular/core';
import { ILoginForm, IResultLogin } from '@core/interfaces/login.interface';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { IMeData } from '@core/interfaces/session.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  /*especificamos los datos del modelo para la interface */
  login: ILoginForm = {
    email: '',
    password: ''
  };
  /*inyectamos para tener la información  de lo que es la consulta a la api de graphql  es decir inyectamos en el constructor */
  constructor(private auth: AuthService, private router: Router) { }
 /* quitamos esta parte ojo y arriba lo del Oninit lo ponemos en el template de @public que es general en public.component
  ngOnInit(): void {
    this.auth.start();
  }
  */
  init() {
    console.log(this.login);
    this.auth.login(this.login.email, this.login.password).subscribe(
      (result: IResultLogin) => {
        console.log(result);
        if (result.status) {
          if (result.token !== null) {
            console.log('Inicio de sesión correcto');
            basicAlert(TYPE_ALERT.SUCCESS, result.message);
            this.auth.setSession(result.token);
            this.auth.updateSession(result);
            /*redireccionando la pagina añadir en el contructor el private */
            this.router.navigate(['/home']);
            return;
          }
          // tslint:disable-next-line: comment-format
          /*guardamos la sesión vamos a core -> services -> auth.services añadimos nueva funcion llamada setSession algo asi ver
          en auth.service.ts*/
          basicAlert(TYPE_ALERT.WARNING, result.message);
          return;
        }

        basicAlert(TYPE_ALERT.INFO, result.message);
        console.log('Inicio de sesión no correcto');
      }
    );

  }
}
