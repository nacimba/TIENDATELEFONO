import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from './table-pagination.component';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TablePaginationComponent],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule
  ],
exports: [TablePaginationComponent]
})

/* este modulo tenemos que usarlo en usuarios vamos a @admin en users y ver users.module.ts ahi tengo que importarlo*/
export class TablePaginationModule { }
