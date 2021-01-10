import { Component, OnInit } from '@angular/core';
/*Paraa deslizar un componente */
import { Output, EventEmitter } from '@angular/core';
@Component({

  /*ojoooooooooooooo modificar app-header por app-admin-header asi en todos los componentes de la plantilla de bootstrap */
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
/*añadimos una propiedad para el despegable */

toggleValue = true;

/*el eventEmitter es para el inport del ouput y ponemos boolean para ver si es true o false */
  @Output() toggleChange = new EventEmitter<boolean>();

 /*añadimos la funcion para el despegable toggleChange es si ha cambiado o no true o false */

 toggled() {
   if (this.toggleValue === undefined) {
      this.toggleValue = true;

   }
   this.toggleValue = !this.toggleValue;
   console.log(this.toggleValue);
   this.toggleChange.emit(this.toggleValue);
 }

}
