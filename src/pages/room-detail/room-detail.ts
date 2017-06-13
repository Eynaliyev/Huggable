import {Component, ViewChild} from '@angular/core';
import {NavController, Content, Platform, NavParams, LoadingController} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import { RoomService } from '../../services/room-service';
import { Message } from '../../shared/message.model';
import { User } from '../../shared/user.model';
import { UtilService } from '../../services/util-service';
import { Camera } from '@ionic-native/camera';
import { Room } from '../../shared/room.model';
import { RoomSettingsPage } from '../room-settings/room-settings';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-room-detail',
  templateUrl: 'room-detail.html',
})

export class RoomDetailPage {
  @ViewChild(Content) content: Content;
  private uid: string;
  private otherId: string;
  private photoUrl: string;
  private newMessage: any;
  private user: User;
  private messages: Message[] = [];
  private guestPicture: string = null;
  private room: Room;

  constructor(public nav: NavController, 
    public roomService: RoomService, 
    public platform: Platform,
    public userService: UserService,
    private utilService: UtilService,
    private loadingCtrl: LoadingController,
    private cameraPlugin: Camera,
    private navParams: NavParams) {
    this.otherId = navParams.get('otherId');
    this.uid = navParams.get('uid');
    this.photoUrl = navParams.get('photoUrl');
    this.userService.getCurrentUser().then(user => this.user = user);
    this.roomService.getRoom(this.uid, this.otherId).subscribe(room => this.room = room);
    //console.log('opening chat with: user id, and otherId: ', this.uid, this.otherId);
    roomService.getMessages(this.uid, this.otherId).subscribe(messages => {
      this.messages = messages;
      loading.dismiss().then(() => console.log('messages: ', messages))
      this.messages.forEach(message => message.time = this.utilService.timeSince(message.time) + " ago");
      console.log(this.photoUrl, this.messages);
    }, error => {
      loading.dismiss().then( () => {
        this.utilService.doAlert(error.message, {
          text: "Ok",
          role: 'cancel'
        });
      });
    });
    let loading = this.loadingCtrl.create();
    loading.present();
  }

  // send message
  sendMessage() {
    if (this.newMessage) {
      let message: Message = {
        from: this.uid,
        type: 'text',
        text: this.newMessage,
        picture: null,
        time: Date.now()
      }
      this.roomService.addMessage(this.uid, this.otherId, message);
    }
    // clear input
    this.newMessage = '';

    // scroll to bottom
    setTimeout(() => {
      // scroll to bottom
      this.content.scrollToBottom();
    }, 200)
  }
  // send picture
  sendPicture() {
    this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.guestPicture = imageData;
      
      let message: Message = {
        from: this.uid,
        type: 'picture',
        text: null,
        picture: this.guestPicture,
        time: Date.now()
      }
      console.log('this image: ', message.picture);
      this.roomService.addMessage(this.uid, this.otherId, message);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });

    // scroll to bottom
    setTimeout(() => {
      // scroll to bottom
      this.content.scrollToBottom();
    }, 200)
    // resetting picture variable to null
    this.guestPicture = null;
  }
  viewSettings(){
    this.nav.push(RoomSettingsPage);
  }
}
