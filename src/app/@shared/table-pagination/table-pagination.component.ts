import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { IResultData, IInfoPage } from '@core/interfaces/result-data.interface'; 
import { map } from 'rxjs/internal/operators/map';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  /*tengo que pillar el selector del component y la clase del module y llamarlos desde los usuarios en @admin pafes -> users en el html pillar el selector */
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  /*valores de entrada */
@Input() query: DocumentNode;
@Input() context: object;
@Input() itemsPage = 20;
@Input() include = true;
@Input() resultData: IResultData;
@Input() tableColumns: Array<ITableColumns> = undefined;
@Input() filterActiveValues: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE;
/*valores de salida al backend */
@Output() manageItem= new EventEmitter<Array<any>>();
infoPage: IInfoPage;
data$:  Observable<any>;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {
    
    if (this.query === undefined){
      throw new Error('Query is undefined, please add ');
      
    }
    if (this.resultData === undefined){
      throw new Error('resultData is undefined, please add ');
      
    }
    if (this.tableColumns === undefined){
      throw new Error('Table Columns is undefined, please add ');
      
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1
    };
    this.loadData();
  }

  /*PARA CARGAR LOS DATOS */
  loadData(){
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include,
      active: this.filterActiveValues
    };
    this.data$ = this.service.getCollectionData(this.query, variables, {}).pipe(
      map((result: any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        return result[this.resultData.definitionKey] [this.resultData.listKey];
      }
    ));
    
  }

  pageChange() {
 console.log(this.infoPage.page);
    this.loadData();
  }

  manageAction(action: string, data: any) {
    console.log(action, data);
    this.manageItem.emit([action, data]);

  }
}
