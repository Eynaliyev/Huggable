import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import {ChatDetailPage} from "../chat-detail/chat-detail";

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
  public user: any;

  constructor(public nav: NavController, public userService: UserService) {
    // set sample data
    this.user = userService.getItem(1);
  }

  // toggle favorite
  toggleFav() {
    this.user.isFaved = !this.user.isFaved;
  }

  // toggle like
  toggleLike() {
    this.user.isLiked = !this.user.isLiked;
  }

  // open chat
  openChat() {
    this.nav.push(ChatDetailPage);
  }
}
