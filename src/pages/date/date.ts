import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {DateService} from '../../services/date-service';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-date',
  templateUrl: 'date.html',
})
export class DatePage {
  // dating
  public dating: any;

  constructor(public nav: NavController, public dateService: DateService) {
    // set sample data
    this.dating = dateService.getItem(1);
  }
}
