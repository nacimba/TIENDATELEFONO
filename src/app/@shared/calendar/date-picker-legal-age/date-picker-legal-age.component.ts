import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss']
})
export class DatePickerLegalAgeComponent implements OnInit {

/*especificamos el día de hoy currendaY */
CURRENTDAY = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate()
};
minDate: NgbDateStruct = {
  year: this.CURRENTDAY.year - 110,
  month: this.CURRENTDAY.month,
  day: this.CURRENTDAY.day
};
maxDate: NgbDateStruct = {
  year: this.CURRENTDAY.year - 18,
  month: this.CURRENTDAY.month,
  day: this.CURRENTDAY.day
};
/*con esto conseguimos que se vea el dato en el calendario en el
registro */
model: NgbDateStruct = this.maxDate;
/*añadimos el output ya que el hijo (datapicker enviara info al padre) */
/*@Output() newItemEvent = new EventEmitter<string>(); el string sera NgbDateStruct */
@Output() newDate = new EventEmitter<NgbDateStruct>();
  constructor() { }

  ngOnInit(): void {
  }
/*añadimos una función para emitir la info del hijo al padre */
selectDateChange(){
  console.log(this.model);
  this.newDate.emit(this.model);
  /*en el html usaremos el evento ngmodelchange para recoger la info */
}

}
