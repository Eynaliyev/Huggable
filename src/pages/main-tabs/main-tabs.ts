import {Component} from '@angular/core';
import {NavController, Platform, MenuController} from 'ionic-angular';
import {ContactsPage} from "../contacts/contacts";
import { UserProfilePage } from "../user-profile/user-profile";
import {FindRoomPage} from '../find-room/find-room';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-main-tabs',
  templateUrl: 'main-tabs.html',
})
export class MainTabsPage {
  // tabs
  public userProfile: any;
  public contacts: any;
  public randomChat: any;
  // tab color
  public tabColor = 'primary';

  constructor(public nav: NavController, public platform: Platform, public menu: MenuController) {
    console.log('Main tabs page initiated');
    // set component for tabs
    this.contacts = ContactsPage;
    this.userProfile = UserProfilePage;
    this.randomChat = FindRoomPage;
    // disable menu
    this.menu.swipeEnable(false);

    // detect platform for tabs color
    if (platform.is('ios')) {
      this.tabColor = '';
    }
  }
}
