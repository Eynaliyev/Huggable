import {Component} from '@angular/core';
import {NavController, Platform, MenuController} from 'ionic-angular';
import {ContactsPage} from "../contacts/contacts";
import {MeetPage} from "../meet/meet";

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
  public nearby: any;
  public match: any;
  public contacts: any;
  public meet: any;
  public wall: any;

  // tab color
  public tabColor = 'primary';

  constructor(public nav: NavController, public platform: Platform, public menu: MenuController) {
    // set component for tabs
    this.contacts = ContactsPage;
    this.meet = MeetPage;

    // disable menu
    this.menu.swipeEnable(false);

    // detect platform for tabs color
    if (platform.is('ios')) {
      this.tabColor = '';
    }
  }
}
