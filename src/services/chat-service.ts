import {Injectable} from "@angular/core";
import {CHATS} from "./mock-chats";

@Injectable()
export class ChatService {
  private chats:any;

  constructor() {
    this.chats = CHATS;
  }
  // get list of Chats of the current user
  // add chat references to both users
  // get chat reference

  getAll() {
    return this.chats;
  }

  getItem(id) {
    for (var i = 0; i < this.chats.length; i++) {
      if (this.chats[i].id === parseInt(id)) {
        return this.chats[i];
      }
    }
    return null;
  }

  remove(item) {
    this.chats.splice(this.chats.indexOf(item), 1);
  }
}