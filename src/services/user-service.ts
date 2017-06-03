import {Injectable} from "@angular/core";
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../shared/user.model';
import { Camera } from 'ionic-native';

@Injectable()
export class UserService {

  private contacts: FirebaseListObservable<any[]>;
  private currentUser: User;
  private users: FirebaseListObservable<User[]>;
  private user: User = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public db: AngularFireDatabase) {
    this.users = db.list("/users");
    this.contacts = db.list(`/users/${this.user.uid}/chats`);
  }
  getUid(): Promise<string>{
    let res = new Promise<any>((resolve, reject) => {
        console.log('uid in getUid(): ', JSON.parse(localStorage.getItem('currentUser')).uid);
        resolve(JSON.parse(localStorage.getItem('currentUser')).uid);
    });
    return res;
  }
  getCurrentUser(): Promise<User>{
    let res = new Promise<any>((resolve, reject) => {
        console.log('currentUser in getCurrentUser(): ', JSON.parse(localStorage.getItem('currentUser')));
        resolve(JSON.parse(localStorage.getItem('currentUser')));
    });
    return res;
  }
  getPicture(){
    let base64Picture;
    let options = {
      destinationType: 0,
      sourceType: 0,
      encodingType: 0
    };
    let promise = new Promise((resolve, reject) => {
      Camera.getPicture(options).then(imageData => {
        base64Picture = "data:image/jpeg;base64," + imageData;
        resolve(base64Picture);
        }, (error) => {
          reject(error);
      });
    });
    return promise;
  }
  // Update Profile Picture
  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.db.object(`/users/${uid}/picture`);
      this.getPicture().then(image => {
        pictureRef.set(image);
      });
    });
  }
  //set current user depending on whether there's somebody like this, or create a new one
  //check for presence of dummy data with arguments
  //if it's there, set current user to dummy data
  setCurrentUser(dummy?: any): void{
    if (dummy) {
      console.log("setting current user to:", dummy);
      localStorage.setItem('currentUser', JSON.stringify(dummy));
    } else {
      localStorage.setItem('currentUser', JSON.stringify(firebase.auth().currentUser.providerData[0]));
      this.currentUser = this.toUser(firebase.auth().currentUser.providerData[0]);
      let userId = JSON.parse(localStorage.getItem('currentUser')).uid;
      console.log('checking if the user is there: ', userId);
      this.checkIfUserExists(userId); 
    }
  }
  // Tests to see if /users/<userId> has any data. 
  checkIfUserExists(id: string): void {
    var usersRef = firebase.database().ref('/users');
    usersRef.child(id).once('value', snapshot => {
      var exists = (snapshot.val() !== null);
      this.userExistsCallback(id, exists);
    });
  }
  // if user exists, do nothing, if not, create a new user
  userExistsCallback(userId: string, exists: boolean): void {
    if (exists) {
      console.log('user ' + userId + ' exists!');
    } else {
      console.log('saving new user to the database');
      this.createUser(this.currentUser);
    }
  }
  // Get Info of a Single User
  getUserProfile(id: string): FirebaseObjectObservable<User> {
    return this.db.object(`/users/${id}`);
  }
  // create user in firebase
  createUser(userCredentials): void {
    const userObservable = this.db.object(`/users/${userCredentials.uid}`);
    console.log('creating a new user in the back-end: ', userCredentials.uid);
    userObservable.set(this.toUser(this.currentUser));
  }
  toUser(data): User{
    let user = {
      uid: data.uid,
      name: data.displayName,
      email: data.email,
      photoUrl: data.photoURL,
      provider: data.providerId
    }
    return user;
  }
  //deleting a user from the database 
  remove(id: string): void {
    this.users.remove(id);
  }
  //logic for contacts list page
  // get list of contacts of the current user
  getUserContacts(): FirebaseListObservable<any[]> {
    let contacts = this.db.list(`/users/${this.user.uid}/contacts`);
    return contacts;
  }
  // TO DO ADD LIKING< CREATING AND CHECKING FOR THEM

  // create a contact - add chat references to both users
  addContact(uid: string, otherId: string): void {
    //tgetting user data to set in contacts user
    this.getUserProfile(otherId).subscribe(user => {
      // mapping the data to the contact interface
      let otherUser = {
        id: otherId,
        name: user.name,
        photoUrl: user.photoUrl,
        age: user.age,
        lastText: "You successfully connected, time to say Hi! :)"
      }
      // seting the contact in this users' contacts list
      this.contacts.push(otherUser);
      //the other user
      let otherRef = this.db.list(`/users/${otherId}/contacts`);
      let thisUser = {
        id: this.user.uid,
        name: this.user.name,
        photoUrl: this.user.photoUrl,
        age: this.user.age,
        lastText: "You successfully connected, time to say Hi! :)"
      };
      otherRef.push(thisUser);
      //push it to the chats list
      this.getUid().then(uid => {
        let chatsRef = this.db.list(`/chats/${uid},${otherId}`);
        chatsRef.push({
          text: "You successfully connected, time to say Hi! :)",
          type: "system-message",
          picture: '',
          time: firebase.database.ServerValue.TIMESTAMP
        })
      });
    });
  }
  // remove a chat from the list
  removeContact(id: string): void {
    //this user
    this.contacts.remove(id);
    //other user
    let otherRef = this.db.list(`/users/${id}/contacts`);
    this.getUid().then(uid => {
      otherRef.remove(uid);   
      //chats list 
      this.db.list(`/chats/${uid},${id}`).remove();
    });
  }
}