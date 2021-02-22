import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
/*Para usar el widget necesitamos el selector del componente  de calendar -> date-picker etcccc y añadirlo al html del register*/
import { DatePickerLegalAgeModule } from '@shared/calendar/date-picker-legal-age/date-picker-legal-age.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    DatePickerLegalAgeModule,
    FormsModule
  ]
})
export class RegisterModule { }

/* crearemos un template llamado forma y lo añadiremos el evento
ngshutme para enviar la info del formu a la bb dd de la api
vamos al htm del register y vemoes donde ponga form  */ 