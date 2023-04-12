import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import carouselItems from '@data/carousel.json';
import { ProductsService } from '@core/services/products.service';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: ICarouselItem[] = [];
  productsList; 
  listOne;
  listTwo;
  listThree;
  /*insertamos la propiedad del servicio de la apiiiiii ojote carnal */
  constructor( private products: ProductsService) {}
  ngOnInit(): void {
//this.listTwo = this.fakeRandomProductList();
    this.products.getByLastUnitsOffers(
      //1 es de la pagina el 4 es del numero de elementos
      1, 4, ACTIVE_FILTERS.ACTIVE,
      // el valor 35 es el stock que solo hay 35
      true, 40, 35).subscribe(result =>{
        console.log('productos a menos de 40');
        this.listTwo = result;
      });
 //this.listOne = this.fakeRandomProductList();
    this.products.getByPlatform(
      1, 4, ACTIVE_FILTERS.ACTIVE,
      true, '18'
    ).subscribe(result =>{
      console.log('productos playstation4', result);
      this.listOne = result;
    });
   // lisTree es estatica ojooooooooooooooooo  this.listThree = this.fakeRandomProductList();
   this.products.getByPlatform(
    1, 4, ACTIVE_FILTERS.ACTIVE,
    true, '4'
  ).subscribe(result =>{
    console.log('productos PC', result);
    this.listThree = result;
  });


//CARROUSEL pagina 1,  6 elementos, ACTIVE_FILTERS.ACTIVE activos, true(el true es para que varie los elementos) si pongo false apareceran los mismos elementos, precio tope -1 no le vamos hacer caso, y ultimas unidades 20
this.products.getByLastUnitsOffers(
  1, 6, ACTIVE_FILTERS.ACTIVE, true, -1, 20).subscribe((result: IProduct[]) => { 
    result.map((item: IProduct) => {

      this.items.push({
        id: item.id,
        title: item.name,
        description: item.description,
        background: item.img,
        url: ''
      });
 
    });
  });

 // EL CARRUSEL LO REALIZAREMOS CON LOS JUEGOS QUE TIENEN LAS ULTIMAS UNIDADES
 // this.items = carouselItems ;// Traer los valores cargados en el carousel.json u otros
  
  }
}


