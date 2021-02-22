import { PublicComponent } from './public.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
path: '',
component: PublicComponent,
children: [

  {
    /*dejamos el path vacio para que nos lleve al home*/
    path: '', loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about', loadChildren: () =>
      import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact', loadChildren: () =>
      import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'login',
     loadChildren: () =>  import('./forms/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./forms/register/register.module').then(m => m.RegisterModule)
  }
 ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
