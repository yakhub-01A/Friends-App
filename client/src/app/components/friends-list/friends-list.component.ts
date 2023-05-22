import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendListComponent implements OnInit {

  friends?: Friend[];
  currentFriend: Friend = {};
  currentIndex = -1;
  title = '';

  constructor(private friendService: FriendService) { }

  ngOnInit(): void {
    this.retrieveFriend();
  }

  retrieveFriend(): void {
    this.friendService.getAll()
      .subscribe({
        next: (data) => {
          this.friends = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveFriend();
    this.currentFriend = {};
    this.currentIndex = -1;
  }

  setActiveFriend(friend: Friend, index: number): void {
    this.currentFriend = friend;
    this.currentIndex = index;
  }

  removeAllFriend(): void {
    this.friendService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentFriend = {};
    this.currentIndex = -1;

    this.friendService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.friends = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}