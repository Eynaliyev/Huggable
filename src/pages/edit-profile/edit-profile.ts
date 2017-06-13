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
  //update data in the backend
  save(){
  }

}
