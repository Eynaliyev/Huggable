import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WelcomePage} from "../welcome/welcome";
import { AuthService } from '../../services/auth-service';

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
    public authService: AuthService) {}
  
  // logout
  logout() {
    this.authService.logoutUser()
    .then(() => this.nav.setRoot(WelcomePage));
  }
}
