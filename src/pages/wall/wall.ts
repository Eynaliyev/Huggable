import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {PostService} from "../../services/post-service";
import {UserDetailPage} from "../user-detail/user-detail";
import {PostPage} from "../post/post";
import {NotificationsPage} from "../notifications/notifications";


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wall',
  templateUrl: 'wall.html',
})
export class WallPage {
  // list of posts
  public posts: any;

  constructor(public nav: NavController, postService: PostService, public app: App) {
    // set sample data
    this.posts = postService.getAll();
  }

  // view user detail
  viewUser(id) {
    this.app.getRootNav().push(UserDetailPage, {id: id});
  }

  // view post
  viewPost(id) {
    this.app.getRootNav().push(PostPage, {id: id});
  }

  // toggle like
  toggleLike(post) {
    // if user liked
    if (post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }

    post.liked = !post.liked
  }

  // view notifications
  viewNotifications() {
    this.app.getRootNav().push(NotificationsPage);
  }
}
