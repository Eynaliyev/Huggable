import {Injectable} from "@angular/core";
import {USERS} from "./mock-users";
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class UserService {

  private currentUser = firebase.auth().currentUser.providerData[0]
  private users:any;

  constructor(public db: AngularFireDatabase) {
    this.users = USERS;
  }
  //set current user depending on whether there's somebody 
  // like this, or create a new one
  setCurrentUser(){
    let user = this.getUserProfile(this.currentUser.uid);
    console.log('checking if the user is there: ', user);
    if(! user){
      this.createUser(this.currentUser)
    }
  }
  // Get Info of a Single User
  getUserProfile(uid): Promise<any> {
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/users')
      .child(uid)
      .on('value', data => {
        resolve(data.val());
      });
    });
  }
  // create user in firebase
  createUser(userCredentials) {
    const userObservable = this.db.object('/users' + userCredentials.uid);
    console.log('creating a new user in the back-end: ', userCredentials.uid);
    userObservable.set(this.currentUser);
  }
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