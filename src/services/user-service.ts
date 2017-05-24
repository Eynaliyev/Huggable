import {Injectable} from "@angular/core";
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class UserService {

  private contacts: FirebaseListObservable<any[]>;
  private currentUser;
  private users: FirebaseListObservable<any[]>;
  private user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public db: AngularFireDatabase) {
    this.users = db.list("/users");
    this.contacts = db.list(`/users/${this.user.uid}/chats`);
  }
  getUid(){
    return JSON.parse(localStorage.getItem('currentUser')).uid;
  }
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  //set current user depending on whether there's somebody like this, or create a new one
  //check for presence of dummy data with arguments
  //if it's there, set current user to dummy data
  setCurrentUser(dummy?: any){
    if (dummy) {
      console.log("setting current user to:", dummy);
      localStorage.setItem('currentUser', JSON.stringify(dummy));
    } else {
      localStorage.setItem('currentUser', JSON.stringify(firebase.auth().currentUser.providerData[0]));
      this.currentUser = firebase.auth().currentUser.providerData[0];
      let userId = this.currentUser.uid;
      console.log('checking if the user is there: ', userId);
      this.checkIfUserExists(userId); 
    }
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
    return this.db.object(`/users/${uid}`);
  }
  // create user in firebase
  createUser(userCredentials) {
    const userObservable = this.db.object(`/users/${userCredentials.uid}`);
    console.log('creating a new user in the back-end: ', userCredentials.uid);
    userObservable.set({
      name: this.currentUser.displayName,
      email: this.currentUser.email,
      photoUrl: this.currentUser.photoURL,
      provider: this.currentUser.providerId
    });
  }
  //logic for contacts list page
  // get list of Chats of the current user
  getUserContacts(): FirebaseListObservable<any[]> {
    let contacts = this.db.list(`/users/${this.user.uid}/contacts`);
    return contacts;
  }

  remove(id) {
    this.users.remove(id);
  }
}