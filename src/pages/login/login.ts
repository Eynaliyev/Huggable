import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {MainTabsPage} from "../main-tabs/main-tabs";


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public nav: NavController, public menu: MenuController) {
    // disable menu
    this.menu.swipeEnable(false);
  }

  // go to home page
  goToHome() {
    this.nav.setRoot(MainTabsPage);
  }
}
