import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user-service';
/**
 * Generated class for the UserProfile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
	user;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfile');
    this.user = this.userService.getCurrentUser();
  }

}
