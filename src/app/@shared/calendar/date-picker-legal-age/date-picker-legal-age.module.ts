import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerLegalAgeComponent } from './date-picker-legal-age.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
/*añadimos el modulo NgbDatepickerModule  con esto ya podemos usar el widged en cualquier apartado*/

@NgModule({
  declarations: [DatePickerLegalAgeComponent],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule
  ],

  /*como va ser un widget añadimos tambien en un export */
  exports: [DatePickerLegalAgeComponent]
})
export class DatePickerLegalAgeModule {}
/*ojo para usar en cualquer lado tenemos que
importar DatePickerLegalAgeModule en donde sea
ejemplo en register.module.ts de register */