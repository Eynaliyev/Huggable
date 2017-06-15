import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseVipPage } from './purchase-vip-page';

@NgModule({
  declarations: [
    PurchaseVipPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseVipPage),
  ],
  exports: [
    PurchaseVipPage
  ]
})
export class PurchaseVipPageModule {}
