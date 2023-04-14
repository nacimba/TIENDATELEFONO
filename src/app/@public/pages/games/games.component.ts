import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { IInfoPage } from '@core/interfaces/result-data.interface';
import { ProductsService } from '@core/services/products.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { subscribe } from 'graphql';
import { IGamePageInfo } from './games-page-info.interface';
import { GAMES_PAGES_INFO, TYPE_OPERATION } from './game.constants';
import { closeAlert, loadData } from '@shared/alerts/alerts';

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
  typeData: TYPE_OPERATION;
  gamesPageInfo: IGamePageInfo;
  productsList: Array<IProduct> =[];
  // 1* para alerta de carga
  loading: boolean;
  // 2* fin parametro para alerta de carga

  constructor(private products: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) =>{
      // 3* para alerta de carga
   this.loading = true;
   loadData('Cargando datos', 'Espera');
// 4* fin para alerta de carga ver abajo private asignResult ese es el fin de alerta total de juego
      console.log(params);
      const keyPage = `${params.type}/${params.filter}`;
      this.gamesPageInfo = GAMES_PAGES_INFO[keyPage]
      this.typeData = params.type;
      this.selectPage = 1;
      this.loadData();
    });
    
  }

  loadData(){

    if (this.typeData === TYPE_OPERATION.PLATFORMS){

      this.products.getByPlatform(
        this.selectPage, this.infoPage.itemsPage, ACTIVE_FILTERS.ACTIVE,
        false, this.gamesPageInfo.platformsIds, true, true
      ).subscribe((data) =>{
        this.asignResult(data);
      });

      return;
    }
    this.products.getByLastUnitsOffers(
      //1 es de la pagina el 4 es del numero de elementos
      //1, 4, ACTIVE_FILTERS.ACTIVE,
      // el valor 35 es el stock que solo hay 35
      //true, 35, -1, false, true
      this.selectPage, this.infoPage.itemsPage, ACTIVE_FILTERS.ACTIVE,
      false, this.gamesPageInfo.topPrice,this.gamesPageInfo.stock, true, true).subscribe((data) =>{
        this.asignResult(data);
      });
    
  }

  private asignResult(data){
    console.log(this.gamesPageInfo.title, data.result);
        this.productsList = data.result;
        this.infoPage =data.info;
// 5* para la alerta de carga 
        closeAlert();
        this.loading = false;
// 6* fin para alerta de carga ojo alerta es lo que sale cargandooo
  }

}
