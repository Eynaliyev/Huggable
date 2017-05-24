import {Component, ViewChild} from '@angular/core';
import {NavController, Content, Platform, NavParams} from 'ionic-angular';

import {ChatService} from '../../services/chat-service';

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

  public chat: any;
  public newMessage: any;

  constructor(public nav: NavController, 
    public chatService: ChatService, 
    public platform: Platform,
    private navParams: NavParams) {
    let id = navParams.get('id');
    this.chat = chatService.getChat(id);
  }

  // send message
  sendMessage() {
    if (this.newMessage) {
      this.chat.messages.push({
        type: 'sent',
        text: this.newMessage,
        picture: '',
        time: 'Just now'
      });

      // clear input
      this.newMessage = '';

      // scroll to bottom
      setTimeout(() => {
        // scroll to bottom
        this.content.scrollToBottom();
      }, 200)
    }
  }

}
