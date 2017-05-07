import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WelcomePage} from "../welcome/welcome";
import { AuthProvider } from '../../providers/auth-provider';

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

  constructor(public nav: NavController,
    public authProvider: AuthProvider) {}
  
  // logout
  logout() {
    this.authProvider.logoutUser()
    .then(() => this.nav.setRoot(WelcomePage));
  }
}
