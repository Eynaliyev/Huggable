import {Component} from '@angular/core';
import {NavController, App, LoadingController} from 'ionic-angular';
import {UserService} from "../../services/user-service";
import {ChatDetailPage} from "../chat-detail/chat-detail";
import {NotificationsPage} from "../notifications/notifications";
import { UtilProvider } from "../../providers/util-provider";
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
    public loadingCtrl: LoadingController,
    public utilProvider: UtilProvider,
    public navCtrl: NavController,
    public app: App) {  }
  
  ionViewDidLoad() {
    this.userService.getUserContacts().subscribe(contacts => {
      this.contacts = contacts;
      loading.dismiss().then(() => console.log('contacts: ', contacts))
    }, error => {
      loading.dismiss().then( () => {
        this.utilProvider.doAlert(error.message, {
          text: "Ok",
          role: 'cancel'
        });
      });
    });
    let loading = this.loadingCtrl.create();
    loading.present();
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
