import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {UserService} from "../../services/user-service";
import {ChatDetailPage} from "../chat-detail/chat-detail";
import {NotificationsPage} from "../notifications/notifications";


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
  public contacts;

  constructor(public nav: NavController, 
    public userService: UserService, 
    public app: App) {
   // set sample data
    //this.chats = chatService.getAll();
    userService.getUserContacts().subscribe(contacts => {
      this.contacts = contacts;
      console.log('contacts: ', contacts);
    });
  }

  // view chat detail
  viewChat(id) {
    this.app.getRootNav().push(ChatDetailPage, {id: id});
  }

  // view notifications
  viewNotifications() {
    this.app.getRootNav().push(NotificationsPage);
  }
}
