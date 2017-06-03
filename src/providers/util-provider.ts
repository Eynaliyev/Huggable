import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the UtilProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilProvider {

  constructor(public http: Http,
  	public alertCtrl: AlertController) {
    console.log('Hello UtilProvider Provider');
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
