import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
//import {DateService} from "../../services/date-service";
import {UserDetailPage} from "../user-detail/user-detail";
import { RoomDiscoverySettingsPage } from '../room-discovery-settings/room-discovery-settings';
import { WaitlistPage } from '../waitlist/waitlist';
import { RoomService } from '../../services/room-service';
import { Room } from '../../shared/room.model';
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
  public room: Room;

  constructor(public nav: NavController, 
    public roomService: RoomService, 
    public app: App) {
  }
  findRandomChat(){
    //search for chatroom
    // while searching open waitlist modal
    this.openWaitlist();
    this.roomService.findRoom()
    .then(room => {
      this.room = room;
      this.closeWaitlist();
    })
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
  closeWaitlist(){
    this.app.getRootNav().pop();
  }
}
