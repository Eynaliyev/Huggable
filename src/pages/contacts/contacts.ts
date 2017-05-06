import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import {UserDetailPage} from "../user-detail/user-detail";

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
  public contacts: any;

  constructor(public nav: NavController, public userService: UserService) {
    // set sample data
    this.contacts = userService.getAll();
  }

  // view contact
  viewContact(id) {
    this.nav.push(UserDetailPage, {id: id});
  }
}
