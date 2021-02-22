import { IMeData } from '@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 session: IMeData = {
status: false
 };

 access = false;
 role: string;
 userLabel= '';

  constructor(private authService: AuthService ) {
   /*haciendo uso del observable */
   this.authService.accessVar$.subscribe((result) => {
     console.log(result.status);
     this.session = result;
     this.access = this.session.status;
     this.role = this.session.user?.role;
     /** creamos una variable para el nombre que aparezaca en la secií aparexzca el numbre del usuario */
     this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
   });
   }

  ngOnInit(): void {
  }
/**creamos una funcion logout para salir de la sesión  */
logout(){
  this.authService.resetSession();
}
}
