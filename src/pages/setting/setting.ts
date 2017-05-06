import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public nav: NavController) {}
  
  // logout
  logout() {
    this.nav.setRoot(LoginPage);
  }
}
