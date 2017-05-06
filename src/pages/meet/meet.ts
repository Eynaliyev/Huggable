import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {DateService} from "../../services/date-service";
import {DatePage} from "../date/date";
import {UserDetailPage} from "../user-detail/user-detail";
import {NotificationsPage} from "../notifications/notifications";


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-meet',
  templateUrl: 'meet.html',
})
export class MeetPage {
  public dates: any;

  constructor(public nav: NavController, public dateService: DateService, public app: App) {
    // set sample data
    this.dates = dateService.getAll();
  }

  // view date
  viewDate(id) {
    this.app.getRootNav().push(DatePage);
  }

  // view user
  viewUser(id) {
    this.app.getRootNav().push(UserDetailPage, {id: id});
  }

  // view notifications
  viewNotifications() {
    this.app.getRootNav().push(NotificationsPage);
  }
}
