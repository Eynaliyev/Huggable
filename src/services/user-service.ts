import {Injectable} from "@angular/core";
import {USERS} from "./mock-users";
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class UserService {

  private currentUser = firebase.auth().currentUser.providerData
  private users:any;

  constructor(public db: AngularFireDatabase) {
    this.users = USERS;
  }
  // get current user's UID
  getUserProfile(): Promise<any> {
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/users')
      .child(firebase.auth().currentUser.uid)
      .on('value', data => {
        resolve(data.val());
      });
    });
  }
  // create user in firebase
  createUser(userCredentials) {
    const userObservable = this.db.object('/users' + firebase.auth().currentUser.providerData[0].uid);
    console.log('creating a new user in the back-end: ', firebase.auth().currentUser.providerData[0].uid);
    userObservable.set(this.currentUser);
  }
  // firebase.auth().currentUser.providerData
  // Get Info of a Single User
  // Get All users of our app - to be changed later to get relevant users
  // get base64 Picture of User - to be changed to get from storage later
  // Update Profile Picture of the user

  getAll() {
    return this.users;
  }

  getItem(id) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === parseInt(id)) {
        return this.users[i];
      }
    }
    return null;
  }

  remove(item) {
    this.users.splice(this.users.indexOf(item), 1);
  }
}