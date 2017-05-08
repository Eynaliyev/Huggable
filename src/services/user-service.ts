import {Injectable} from "@angular/core";
import {USERS} from "./mock-users";

@Injectable()
export class UserService {
  private users:any;

  constructor() {
    this.users = USERS;
  }
  // get current user's UID
  // Get Info of a Single User
  // Get All users of our app - to be changed later to get relevant users
  // get base64 Picture of User - to be changed to get from storage later
  // Update Profile Picture of the user

  getAll() {
    return this.users;
  }

  getItem(id) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === parseInt(id)) {
        return this.users[i];
      }
    }
    return null;
  }

  remove(item) {
    this.users.splice(this.users.indexOf(item), 1);
  }
}