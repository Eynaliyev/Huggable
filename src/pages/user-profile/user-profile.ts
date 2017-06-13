import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { User } from '../../shared/user.model';
import { WelcomePage } from '../welcome/welcome';
import { EditProfilePage } from '../edit-profile/edit-profile';
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
        console.log('this user in user.profile: ', this.user);
      });
    });
  }
  editProfile(){
    this.navCtrl.push(EditProfilePage);
  }
  logout() {
    this.authService.logoutUser()
    .then(() => this.navCtrl.setRoot(WelcomePage));
  }
}
