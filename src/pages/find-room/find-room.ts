import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
//import {DateService} from "../../services/date-service";
import {UserDetailPage} from "../user-detail/user-detail";
import { RoomDiscoverySettingsPage } from '../room-discovery-settings/room-discovery-settings';
import { WaitlistPage } from '../waitlist/waitlist';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-find-room',
  templateUrl: 'find-room.html',
})
export class FindRoomPage {
  public dates: any;

  constructor(public nav: NavController, 
    //public dateService: DateService, 
    public app: App) {
    // set sample data
    //this.dates = dateService.getAll();
  }
  findRandomChat(){
    //search for chatroom
    // while searching open waitlist modal
    this.openWaitlist();
    //when found a room close the modal
  }

  // view user
  viewUser(id) {
    this.app.getRootNav().push(UserDetailPage, {id: id});
  }
  // view notifications
  viewSettings() {
    this.app.getRootNav().push(RoomDiscoverySettingsPage);
  }
  openWaitlist() {
    this.app.getRootNav().push(WaitlistPage);
  }
}
