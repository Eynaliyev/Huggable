import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SwingModule } from 'angular2-swing';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppProviders } from './app.providers';
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
import {RoomDetailPage} from '../pages/room-detail/room-detail';
import {DatePage} from '../pages/date/date';
import {SettingPage} from '../pages/setting/setting';
import { LoaderComponent } from '../shared/loader.component'
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
    UserProfilePage,
    RoomDetailPage,
    LoaderComponent
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
  providers: AppProviders.getProviders()
})
export class AppModule {}
