import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {UserService} from "../../services/user-service";
import {ChatDetailPage} from "../chat-detail/chat-detail";
import {NotificationsPage} from "../notifications/notifications";
import { UtilService } from "../../services/util-service";
import { Contact } from '../../shared/user.model';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  public contacts: Contact[];

  constructor(public nav: NavController, 
    public userService: UserService, 
    public utilService: UtilService,
    public navCtrl: NavController,
    public app: App) {  }
  
  ionViewDidLoad() {
    this.userService.getUid().then(uid => {
      this.userService.getUserContacts(uid).subscribe(contacts => {
        this.contacts = contacts;
      }, error => {
        this.utilService.doAlert(error.message, {
          text: "Ok",
          role: 'cancel'
        });
      });
    });
  }
  // view chat detail
  viewChat(id, photo) {
    this.userService.getUid().then(uid =>{
      let params = {uid: uid, otherId: id, photoUrl: photo}
      this.app.getRootNav().push(ChatDetailPage, params);
    });
  }

  // view notifications
  viewNotifications() {
    this.navCtrl.push(NotificationsPage);
  }
}
