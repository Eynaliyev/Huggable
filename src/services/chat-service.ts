import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Chat} from '../shared/chat.model';
import {UserService} from './user-service';
import {Message} from '../shared/message.model';

@Injectable()
export class ChatService {

  private chats: FirebaseListObservable<Chat[]>;
  private chat: FirebaseObjectObservable<any[]>;
  private user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(public db: AngularFireDatabase, public us: UserService) {
    this.chats = db.list(`/chats`);
  }
  // get a specific chat from the list - get chat reference
  getChat(uid: string, id: string): FirebaseObjectObservable<any> {
    let chat = this.db.object(`/chats/${uid},${id}`);
    return chat;
  }
  getMessages(uid: string, id: string): FirebaseListObservable<any> {
    let messages = this.db.list(`/chats/${uid},${id}/messages`);
    return messages;
  }  // mapping to the chat data used in-app
  toChat(userId, otherId, messages){
    // unique id based on the ids of two users
    let combinedId = [userId, otherId]
    let chat = {
      id: combinedId,
      messages: messages
    }
    return chat;
  }
  // create a chat - add chat references to both users
  addMessage(uid: string, otherId: string, message: Message): void {
    //push it to the chats list
    let chatsRef = this.db.list(`/chats/${uid},${otherId}/messages`);
    chatsRef.push(message);
  }
  // remove a chat from the list
  removeMessage(userId: string, messageId: string): void {
    //chats list 
    this.db.list(`/chats/${this.user.uid},${userId}/messages`).remove(messageId);
  }
}