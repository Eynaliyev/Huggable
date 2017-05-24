import {Injectable} from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {UserService} from './user-service';
@Injectable()
export class ChatService {
  private chats: FirebaseListObservable<any[]>;
  private chat: FirebaseListObservable<any[]>;
  private user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public db: AngularFireDatabase, public us: UserService) {
    this.chats = db.list(`/chats`);
  }

  // create a chat - add chat references to both users
  addContact(otherId): void {
    //this user
    this.chats.push({otherId: true});
    //the other user
    let otherRef = this.db.list(`/users/${otherId}/chats`);
    let userId = this.user.uid;
    otherRef.push({userId: true});
    //push it to the chats list
    let chatsRef = this.db.list(`/chats/${userId},${otherId}`);
    chatsRef.push({"active": true});
  }
  // get a specific chat from the list - get chat reference
  getChat(id): FirebaseListObservable<any[]> {
    this.chat = this.db.list(`/chats/${this.user.uid},${id}`);
    return this.chat
  }
  // remove a chat from the list
  removeContact(id): void {
    //this user
    this.chats.remove(id);
    //other user
    let otherRef = this.db.list(`/users/${id}/chats`);
    let userId = this.user.uid;
    otherRef.remove(userId);   
    //chats list 
    this.db.list(`/chats/${this.user.uid},${id}`).remove()
  }
}