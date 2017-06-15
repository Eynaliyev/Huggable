import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PurchaseVipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-purchase-vip',
  templateUrl: 'purchase-vip.html',
})
export class PurchaseVipPage {
	selected;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  select(btn){
  	this.selected = btn;
    console.log(btn);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseVipPage');
  }
  buyVIP(){
  	console.log(this.selected);
  }
}
