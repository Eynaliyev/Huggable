import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import {ChatDetailPage} from "../chat-detail/chat-detail";
import { User } from '../../shared/user.model';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {
  // user info
  public user: User;

  constructor(public nav: NavController, public userService: UserService) {
    // set sample data
    userService.getUserProfile('uid1').subscribe(user => this.user = user);
  }

  // like somebody
  like() {
  }

  // open chat
  openChat() {
    this.nav.push(ChatDetailPage);
  }
}
