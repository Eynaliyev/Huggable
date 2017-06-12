import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomDiscoverySettingsPage } from './room-discovery-settings';

@NgModule({
  declarations: [
    RoomDiscoverySettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomDiscoverySettingsPage),
  ],
  exports: [
    RoomDiscoverySettingsPage
  ]
})
export class RoomDiscoverySettingsPageModule {}
