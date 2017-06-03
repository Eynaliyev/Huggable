import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SwingModule } from 'angular2-swing';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// import services
import {UtilProvider} from '../providers/util-provider';
import {AuthProvider} from '../providers/auth-provider';
import {UserService} from '../services/user-service';
import {ChatService} from '../services/chat-service';
import {PostService} from '../services/post-service';
import {DateService} from '../services/date-service';
import {NotificationService} from '../services/notification-service';
// end import services

// import pages
import {MainTabsPage} from '../pages/main-tabs/main-tabs';
import {WelcomePage} from '../pages/welcome/welcome';
import {ContactsPage} from '../pages/contacts/contacts';
import {MeetPage} from '../pages/meet/meet';
import {FilterPage} from '../pages/filter/filter';
import {NotificationsPage} from '../pages/notifications/notifications';
import {UserProfilePage} from '../pages/user-profile/user-profile';
import {UserDetailPage} from '../pages/user-detail/user-detail';
import {ChatDetailPage} from '../pages/chat-detail/chat-detail';
import {DatePage} from '../pages/date/date';
import {SettingPage} from '../pages/setting/setting';
// end import pages

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDI22hmtv2clf3WYdo2y04z_h-eCfbv_F4",
  authDomain: "huggable-9e981.firebaseapp.com",
  databaseURL: "https://huggable-9e981.firebaseio.com",
  projectId: "huggable-9e981",
  storageBucket: "huggable-9e981.appspot.com",
  messagingSenderId: "272489685620"
};

class CameraMock extends Camera {
  getPicture(options){
    return new Promise( (resolve, reject) => {
      resolve(`TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=`);
    });
  }
}

@NgModule({
  declarations: [
    MyApp,
    MainTabsPage,
    WelcomePage,
    ContactsPage,
    MeetPage,
    FilterPage,
    NotificationsPage,
    UserDetailPage,
    ChatDetailPage,
    DatePage,
    SettingPage,
    UserProfilePage
    /* import pages */
  ],
  imports: [
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, 
    IonicModule.forRoot(MyApp, {
        platforms: {
          android: {
            tabsPlacement: 'top',
            tabsLayout: 'title-hide',
            color: 'primary'
          },
          windows: {
            tabsLayout: 'title-hide'
          }
        }
      }
    ),
    BrowserModule, 
    SwingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainTabsPage,
    WelcomePage,
    ContactsPage,
    MeetPage,
    FilterPage,
    NotificationsPage,
    UserDetailPage,
    ChatDetailPage,
    DatePage,
    SettingPage,
    UserProfilePage
    /* import pages */
  ],
  providers: [
    UserService,
    ChatService,
    PostService,
    DateService,
    NotificationService,
    //Camera,
    {provide: Camera, useClass: CameraMock},
    Facebook,
    AuthProvider,
    UtilProvider
    /* import services */
  ]
})
export class AppModule {}
