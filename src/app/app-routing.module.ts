import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home', loadChildren: () =>
      import('./@public/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about', loadChildren: () =>
      import('./@public/pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact', loadChildren: () =>
      import('./@public/pages/contact/contact.module').then(m => m.ContactModule)
  },

 /* {
    path: 'admin', loadChildren: () =>
      import('./@admin/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'admin/users', loadChildren: () =>
      import('./@admin/pages/users/users.module').then(m => m.UsersModule)
  },
*/
  { path: '', redirectTo: 'home', pathMatch: 'full' }
,
  /*Siempre al final */
  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];


/* tecnica de leasing loading llamada hasss tecnica hassss para que no recargue pagina mirar el routes de abajo*/
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, 
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
