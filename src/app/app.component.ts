import {Component, NgZone} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from 'ionic-native';
import {AuthProvider} from '../providers/auth-provider';

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

  constructor(public platform: Platform) {
    this.rootPage = WelcomePage;

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
