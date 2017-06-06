import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
// import services
import {UtilService} from '../services/util-service';
import {AuthService} from '../services/auth-service';
import {UserService} from '../services/user-service';
import {ChatService} from '../services/chat-service';
import {RoomService} from '../services/room-service';
import {NotificationService} from '../services/notification-service';
// end import services

 
class CameraMock extends Camera {
  getPicture(options){
    return new Promise( (resolve, reject) => {
      resolve(`TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=`);
    });
  }
}
 
export class AppProviders {
 
    public static getProviders() {
 
        let providers;
 
        if(document.URL.includes('https://') || document.URL.includes('http://')){
 
          // Use browser providers
          providers = [
            UserService,
            ChatService,
            NotificationService,
            {provide: Camera, useClass: CameraMock},
            Facebook,
            AuthService,
            UtilService,
            RoomService
            /* import services */
          ];
 
        } else {
 
          // Use device providers
          providers = [
            UserService,
            ChatService,
            NotificationService,
            Camera,
            Facebook,
            AuthService,
            UtilService,
            RoomService
            /* import services */
          ];  
 
        }
 
        return providers;
 
    }
 
}