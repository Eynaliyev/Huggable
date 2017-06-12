import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitlistPage } from './waitlist-page';

@NgModule({
  declarations: [
    WaitlistPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitlistPage),
  ],
  exports: [
    WaitlistPage
  ]
})
export class WaitlistPageModule {}
