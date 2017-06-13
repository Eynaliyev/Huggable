import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomSettingsPage } from './room-settings';

@NgModule({
  declarations: [
    RoomSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomSettingsPage),
  ],
  exports: [
    RoomSettingsPage
  ]
})
export class RoomSettingsModule {}
