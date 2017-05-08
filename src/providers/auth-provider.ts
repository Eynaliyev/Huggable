import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import {UserService} from '../services/user-service';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http,
  	private facebook: Facebook,
  	public userService: UserService) {
    console.log('Hello AuthProvider Provider');
  }
	facebookLogin(): firebase.Promise<any> {
		return this.facebook.login(['email']).then( (response) => {
			const facebookCredential = firebase.auth.FacebookAuthProvider
			.credential(response.authResponse.accessToken);

			return firebase.auth().signInWithCredential(facebookCredential)
			.then((success) => {
				console.log("Firebase success: " + JSON.stringify(success));
				console.log('current user.providerData: ', firebase.auth().currentUser.providerData[0]);
				this.userService.setCurrentUser();
				/* creating a user profile - for user profile purposes?
				firebase.database().ref('/userProfile').child(success.uid)
				.set({ email: email });
				});*/
				return success;
			})
			.catch((error) => {
			console.log("Firebase failure: " + JSON.stringify(error));
			return error;
			});
		}).catch((error) => { console.log(error) });
	}
 	logoutUser(): firebase.Promise<void> {
		return firebase.auth().signOut();
 	}
  
}
