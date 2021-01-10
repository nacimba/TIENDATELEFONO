import { Component} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent   {
/*el toggled por defecto sera true se mostrara si quiro que no se muestre un false*/
  toggledValue = true;
  toggled($event) {

console.log('admin', $event);

this.toggledValue = $event;
  }

}
