import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Room} from '../shared/room.model';
import {UserService} from './user-service';
import {Message} from '../shared/message.model';
import { UtilService} from '../services/util-service';
import firebase from 'firebase';


@Injectable()
export class RoomService {
  constructor(
    public db: AngularFireDatabase, 
    public us: UserService,
    private utilService: UtilService) {
  }
  // get a specific room from the list - get room reference
  getRoom(uid: string, id: string): FirebaseObjectObservable<any> {
    let roomRef = this.db.object(`/rooms/${uid},${id}`);
    return roomRef;
  }
  getMessages(uid: string, id: string): FirebaseListObservable<any> {
    let messagesRef = this.db.list(`/rooms/${uid},${id}/messages`);
    return messagesRef;
  }  // mapping to the room data used in-app
  toRoom(userId, otherId, messages): Room{
    // unique id based on the ids of two users
    let room = {
      id: userId,
      messages: messages,
      guysWaitlist: [],
      girlsWaitlist: [],
      location: [],
      menNum: 0,
      womenNum: 0,
      members: []
    }
    return room;
  }
  // create a room - add room references to both users
  addMessage(uid: string, otherId: string, message: Message): void {
    //push it to the rooms list
    let roomsRef = this.db.list(`/rooms/${uid},${otherId}/messages`);
    if (message.picture === null){
      roomsRef.push(message);
    } else {
      //assuming we have a picture so we'll need to store it in firebase 
      //storage and save the URL as a picture property
      //generate a unique name for storing in firebase storage
      let uidName = this.utilService.guid();
      firebase.storage().ref(`/rooms/${uid},${otherId}/messages`)
      .child(`${uidName}.png`)
      .putString(message.picture, 'base64', {contentType: 'image/png'})
      .then((savedPicture) => {
        message.picture = savedPicture.downloadURL;
        roomsRef.push(message);
      });
    }
  }
  // remove a room from the list
  removeMessage(userId, otherId: string, messageId: string): void {
    //rooms list 
    this.db.list(`/rooms/${userId},${otherId}/messages`).remove(messageId);
  }
}