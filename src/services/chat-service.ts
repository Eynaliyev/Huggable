import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Chat} from '../shared/chat.model';
import {UserService} from './user-service';
@Injectable()
export class ChatService {
  private chats: FirebaseListObservable<any[]>;
  private chat: FirebaseListObservable<any[]>;
  private user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public db: AngularFireDatabase, public us: UserService) {
    this.chats = db.list(`/chats`);
  }
  // get a specific chat from the list - get chat reference
  getChat(id): FirebaseListObservable<Chat[]> {
    this.chat = this.db.list(`/chats/${this.user.uid},${id}`);
    return this.chat
  }
  // create a chat - add chat references to both users
  addMessage(message, otherId): void {
    //push it to the chats list
    let chatsRef = this.db.list(`/chats/${this.user.id},${otherId}/messages`);
    chatsRef.push(message);
  }
  // remove a chat from the list
  removeMessage(userId, messageId): void {
    //chats list 
    this.db.list(`/chats/${this.user.uid},${userId}/messages`).remove(messageId);
  }
}