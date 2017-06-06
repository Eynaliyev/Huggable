import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the UtilService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilService {

  constructor(public http: Http,
  	public alertCtrl: AlertController) {
    console.log('Hello UtilService Provider');
  }
  // generate a random name to put in firebase storage
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  timeSince(date) {
    let newDate = Date.now();
    var seconds = Math.floor((newDate - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  doAlert(message, buttonText): void {
  	console.log(message);
    let alert = this.alertCtrl.create({
		message: message,
		buttons: [buttonText]
    });
    alert.present();
  }
}
