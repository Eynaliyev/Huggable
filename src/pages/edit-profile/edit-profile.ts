import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { User } from '../../shared/user.model';

/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user: User;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.userService.getUid().then(uid => {
      this.userService.getUserProfile(uid)
      .subscribe(user => {
        this.user = user;
      });
    });
  }
  //update data in the backend
  save(){
    this.userService.updateProfile(this.user);
  }
}
