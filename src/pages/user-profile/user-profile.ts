import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { User } from '../../shared/user.model';
import {WelcomePage} from '../welcome/welcome';
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
  user: User;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private userService: UserService,
   private authService: AuthService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfile');
    this.userService.getUid().then(uid => {
      this.userService.getUserProfile(uid)
      .subscribe(user => {
        this.user = user;
        this.addTestData();
      });
    });
  }
  addTestData(){
    this.user.age = 25;
    this.user.distance = 15;
    this.user.images = [];
    this.user.city = 'Baku';
    this.user.zodiac = 'Cancer';
    this.user.job = 'DPI Creative Agency';
    this.user.relationshipStatus = 'single';
    this.user.about = "I'm a creator";
    this.user.images.push(this.user.photoUrl);
  }
  logout() {
    this.authService.logoutUser()
    .then(() => this.navCtrl.setRoot(WelcomePage));
  }
}
