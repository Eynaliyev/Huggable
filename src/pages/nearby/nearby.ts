import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import {FilterPage} from "../filter/filter";
import {UserDetailPage} from "../user-detail/user-detail";
import {NotificationsPage} from "../notifications/notifications";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {
  // list of nearby users
  public users: any;

  constructor(public nav: NavController, public userService: UserService, public app: App) {
    // set sample data
    this.users = userService.getAll();
  }

  // go to filter page
  goToFilter() {
    this.app.getRootNav().push(FilterPage);
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
