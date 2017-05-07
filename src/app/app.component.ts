import {Component, NgZone} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from 'ionic-native';
import {AuthProvider} from '../providers/auth-provider';
import firebase from 'firebase';
// import pages
import {MainTabsPage} from '../pages/main-tabs/main-tabs';
import {WelcomePage} from '../pages/welcome/welcome';
import {ContactsPage} from '../pages/contacts/contacts';
import {SettingPage} from '../pages/setting/setting';
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

  public nav: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: MainTabsPage
    },

    {
      title: 'Contacts',
      icon: 'ios-home-outline',
      count: 0,
      component: ContactsPage
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
    public authProvider: AuthProvider) {
    console.log('inside app component');
    this.zone = new NgZone({});
    this.rootPage = WelcomePage;
    firebase.initializeApp({
      apiKey: "AIzaSyDI22hmtv2clf3WYdo2y04z_h-eCfbv_F4",
      authDomain: "huggable-9e981.firebaseapp.com",
      databaseURL: "https://huggable-9e981.firebaseio.com",
      projectId: "huggable-9e981",
      storageBucket: "huggable-9e981.appspot.com",
      messagingSenderId: "272489685620"
    });
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
}
