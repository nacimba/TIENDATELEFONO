import { UsersService } from '@core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /*insertamos la propiedad del servicio de la apiiiiii ojote carnal */
  constructor(private usersApi: UsersService, private auth: AuthService) {}
  ngOnInit(): void {
    this.usersApi.getUsers(2, 1).subscribe(result => {
      console.log(result);
    });
   /* de momento comentamos ya que no nos hace falta despues siii ojo
    /*uso lo de la api de apollo
    this.usersApi.getUsers().subscribe(result => {
      console.log(result); // tendía {{status message users: []}}
    });
    /* usamos el objeto de la api getMe 
    this.auth.getMe().subscribe(result => {
      console.log(result); // tendía {status message user: {}}
    });*/
  }
}
