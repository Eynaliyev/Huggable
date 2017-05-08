import {Component} from '@angular/core';
import {NavController, MenuController, LoadingController, AlertController} from 'ionic-angular';
import {MainTabsPage} from "../main-tabs/main-tabs";
import {AuthProvider} from "../../providers/auth-provider";
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public nav: NavController, 
    public menu: MenuController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider) {
    // disable menu
      this.menu.swipeEnable(false);
      //console.log('inside welcome page');
    }
  // go to home page
  goToHome() {
    this.nav.setRoot(MainTabsPage);
  }
  facebookLogin(): void {
    this.authProvider.facebookLogin()
      .then( authData => {
        loading.dismiss().then( () => {
          this.goToHome();
      });
    }, error => {
      loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    let loading = this.loadingCtrl.create();
    loading.present();
  }
}
