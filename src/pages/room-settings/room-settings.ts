import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { RoomService } from '../../services/room-service';
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

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private userService: UserService,
  	private roomService: RoomService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomSettings');
  }
  inviteFriend(){
  	this.userService.inviteFriend();
  }
  changeRoom(){
  	this.roomService.findRoom();
  }

}
