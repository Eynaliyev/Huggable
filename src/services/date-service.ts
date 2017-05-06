import {Injectable} from "@angular/core";
import {DATES} from "./mock-dates";

@Injectable()
export class DateService {
  private dates:any;

  constructor() {
    this.dates = DATES;
  }

  getAll() {
    return this.dates;
  }

  getItem(id) {
    for (var i = 0; i < this.dates.length; i++) {
      if (this.dates[i].id === parseInt(id)) {
        return this.dates[i];
      }
    }
    return null;
  }

  remove(item) {
    this.dates.splice(this.dates.indexOf(item), 1);
  }
}