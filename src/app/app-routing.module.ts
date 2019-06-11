import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { FinishComponent } from './finish/finish.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: ShowproductsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'finish', component: FinishComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
