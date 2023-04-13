import { Component, OnInit } from '@angular/core';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { IInfoPage } from '@core/interfaces/result-data.interface';
import { ProductsService } from '@core/services/products.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  selectPage;
  infoPage: IInfoPage = {
    page: 1,
    pages: 8,
    total: 160,
    itemsPage: 20
  };
  productsList: Array<IProduct> =[];
  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.products.getByPlatform(
      this.infoPage.page, this.infoPage.itemsPage, ACTIVE_FILTERS.ACTIVE,
      false, ["18","16"], true
    ).subscribe(data =>{
      console.log('productos playstation4', data.result);
      this.productsList = data.result;
      this.infoPage =data.info;
    });
  }

}
