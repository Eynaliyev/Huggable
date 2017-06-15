import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { User } from '../../shared/user.model';
import { WelcomePage } from '../welcome/welcome';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { SettingsPage} from '../settings/settings';
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
    private authService: AuthService,
    private app: App) {
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
  viewSettings(){
    this.navCtrl.push(SettingsPage);
  }
  logout() {
    this.authService.logoutUser()
    .then(() => this.app.getRootNav().setRoot(WelcomePage));
  }
}
