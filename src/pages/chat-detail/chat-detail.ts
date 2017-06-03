import {Component, ViewChild} from '@angular/core';
import {NavController, Content, Platform, NavParams} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import {ChatService} from '../../services/chat-service';
import { Chat } from '../../shared/chat.model';
import { Message } from '../../shared/message.model';
import { User } from '../../shared/user.model';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})

export class ChatDetailPage {
  @ViewChild(Content) content: Content;
  private uid: string;
  private otherId: string;
  private photoUrl: string;
  private chat: Chat;
  private newMessage: any;
  private user: User;
  private messages: Message[] = [];

  constructor(public nav: NavController, 
    public chatService: ChatService, 
    public platform: Platform,
    public userService: UserService,
    private navParams: NavParams) {
    this.otherId = navParams.get('otherId');
    this.uid = navParams.get('uid');
    this.photoUrl = navParams.get('photoUrl');
    this.userService.getCurrentUser().then(user => this.user = user);
    //console.log('opening chat with: user id, and otherId: ', this.uid, this.otherId);
    chatService.getMessages(this.uid, this.otherId).subscribe(messages => {
      this.messages = messages;
      console.log(this.photoUrl, this.messages);
    });
  }

  // send message
  sendMessage() {
    if (this.newMessage) {
      let message: Message = {
        from: this.uid,
        type: 'text',
        text: this.newMessage,
        time: Date.now()
      }
      this.chatService.addMessage(this.uid, this.otherId, message);
    }
    // clear input
    this.newMessage = '';

    // scroll to bottom
    setTimeout(() => {
      // scroll to bottom
      this.content.scrollToBottom();
    }, 200)
  }
  // send picture
  sendPicture() {
    let message: Message = {
      from: this.uid,
      type: 'picture',
      picture: null,
      time: Date.now()
    }
    this.userService.getPicture()
      .then(image => {
        message.picture = image;
        this.messages.push(message);
      });
    this.chatService.addMessage(this.uid, this.otherId, message);

    // scroll to bottom
    setTimeout(() => {
      // scroll to bottom
      this.content.scrollToBottom();
    }, 200)
  }
}
