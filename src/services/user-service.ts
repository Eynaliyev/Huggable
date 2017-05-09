import {Injectable} from "@angular/core";
import {USERS} from "./mock-users";
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class UserService {

  private currentUser;
  private users:any;

  constructor(public db: AngularFireDatabase) {
    this.users = USERS;
  }
  //set current user depending on whether there's somebody 
  // like this, or create a new one
  getCurrentUser(){
    return this.currentUser;
  }
  setCurrentUser(){
    this.currentUser = firebase.auth().currentUser.providerData[0];
    let userId = this.currentUser.uid;
    console.log('checking if the user is there: ', userId);
    this.checkIfUserExists(userId);
  }
  // Tests to see if /users/<userId> has any data. 
  checkIfUserExists(uid) {
    var usersRef = firebase.database().ref('/users');
    usersRef.child(uid).once('value', snapshot => {
      var exists = (snapshot.val() !== null);
      this.userExistsCallback(uid, exists);
    });
  }
  // if user exists, do nothing, if not, create a new user
  userExistsCallback(userId, exists) {
    if (exists) {
      console.log('user ' + userId + ' exists!');
    } else {
      console.log('saving new user to the database');
      this.createUser(this.currentUser);
    }
  }
  // Get Info of a Single User
  getUserProfile(uid): FirebaseObjectObservable<any> {
    return this.db.object('/users/' + uid);
    /*
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/users')
      .child(uid)
      .on('value', data => {
        resolve(data.val());
      });
    });*/
  }
  // create user in firebase
  createUser(userCredentials) {
    const userObservable = this.db.object('/users/' + userCredentials.uid);
    console.log('creating a new user in the back-end: ', userCredentials.uid);
    userObservable.set({
      name: this.currentUser.displayName,
      email: this.currentUser.email,
      photoUrl: this.currentUser.photoURL,
      provider: this.currentUser.providerId
    });
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