import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { RoomService } from '../../services/room-service';
import { Room } from '../../shared/room.model';
import { WaitlistPage } from '../waitlist/waitlist';

/**
 * Generated class for the RoomSettings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-room-settings',
  templateUrl: 'room-settings.html',
})
export class RoomSettingsPage {
  public room: Room;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private userService: UserService,
  	private roomService: RoomService, 
    public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomSettings');
  }
  inviteFriend(){
  	this.userService.inviteFriend();
  }
  changeRoom(){
  	this.roomService.leaveRoom();
    this.openWaitlist();
    this.roomService.findRoom()
    .then(room => {
      this.room = room;
      this.closeWaitlist();
    })
  }
  openWaitlist() {
    this.app.getRootNav().push(WaitlistPage);
  }
  closeWaitlist(){
    this.app.getRootNav().pop();
  }
}
