import {Component, NgZone} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from 'ionic-native';
import {AuthService} from '../services/auth-service';
import {UserService} from '../services/user-service';
import firebase from 'firebase';
// import pages
import {MainTabsPage} from '../pages/main-tabs/main-tabs';
import {WelcomePage} from '../pages/welcome/welcome';
import { User } from '../shared/user.model';
// end import pages

@Component({
  templateUrl: 'app.html',
})
export class MyApp {

  public rootPage: any;
  zone:NgZone;
  private user: User;


  constructor(public platform: Platform,
    public authService: AuthService,
    private userService: UserService) {
    //console.log('inside app component');
    this.zone = new NgZone({});
    this.rootPage = WelcomePage;
    this.userService.getCurrentUser().then(user => this.user = user);
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = WelcomePage;
          unsubscribe();
        } else { 
          this.rootPage = MainTabsPage;
          unsubscribe();
        }
      });     
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
