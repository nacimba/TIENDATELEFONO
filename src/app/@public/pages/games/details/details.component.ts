import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@core/services/products.service';
import products from '@data/products.json'
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { closeAlert, loadData } from '@shared/alerts/alerts';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product:  IProduct;
  //products[Math.floor(Math.random()* products.length)];
  selectImage: string;
  currencySelect = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO];
  randomItems: Array<IProduct> =[];
  screens =  [];
  relationalProducts: Array<object> = [];
  //carga rara de juegos
  loading: boolean;
  //fin carga rara de juegos

  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params) =>{
       //carga rara de juegos
       loadData('Cargando datos', 'Espera');
     this.loading = true;
  //fin carga rara de juegos
    this.loadDataValue(+params.id);
    });
   
  }

  loadDataValue(id: number){
    this.productService.getItem(id).subscribe( result => {
      console.log(result);
      this.product = result.product;
      this.selectImage = this.product.img;
      this.screens = result.screens;
      this.relationalProducts = result.relational;
      this.randomItems = result.random;

      //carga de detalles de videojuegos
      this.loading = false;
      closeAlert();
      //fin carga de detalles de videojuegos
    });
  }
  changeValue(qty: number){
    console.log(qty);
  }

  selectOtherPlatform($event){
    console.log($event.target.value);
    this.loadDataValue(+$event.target.value);
  }

  selectImgMain(i){

    this.selectImage = this.screens[i];
  }
 
}
