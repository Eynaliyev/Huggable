import {Component, NgZone} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from 'ionic-native';
import {AuthProvider} from '../providers/auth-provider';
import {UserService} from '../services/user-service';
import firebase from 'firebase';
// import pages
import {MainTabsPage} from '../pages/main-tabs/main-tabs';
import {WelcomePage} from '../pages/welcome/welcome';
import {SettingPage} from '../pages/setting/setting';
import {UserProfilePage} from '../pages/user-profile/user-profile';
import { User } from '../shared/user.model';
// end import pages

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;
  zone:NgZone;
  private user: User;

  public nav: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: MainTabsPage
    },
    {
      title: 'Profile',
      icon: 'ion-android-person',
      count: 0,
      component: UserProfilePage
    },
    {
      title: 'Setting',
      icon: 'ios-home-outline',
      count: 0,
      component: SettingPage
    },
    // import menu
  ];

  constructor(public platform: Platform,
    public authProvider: AuthProvider,
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    this.authProvider.logoutUser()
    .then(() => this.nav.setRoot(WelcomePage));
  }
}
