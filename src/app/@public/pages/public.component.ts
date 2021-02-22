import { AuthService } from './../../@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private auth: AuthService) { }
/*Con esto generalizado pues va refrescar bien en todo momento
ya que cambiaba de pagina y era como si me salia del menu */
    ngOnInit(): void {
      this.auth.start();
    }
  }


