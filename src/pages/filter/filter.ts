import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  // filter values
  public gender = 0;
  public ageRange = {
    lower: 18,
    upper: 65
  };
  public city: any;
  public country: any;

  constructor(public nav: NavController) {}

  // on filter dismiss
  dismiss() {
    // store your values
    // go back
    this.nav.pop();
  }
}
