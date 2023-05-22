import { Component } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {

  friend: Friend = {
    title: '',
    description: '',
    status: false
  };
  submitted = false;

  constructor(private friendService: FriendService) { }

  saveFriend(): void {
    const data = {
      title: this.friend.title,
      description: this.friend.description
    };

    this.friendService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newFriend(): void {
    this.submitted = false;
    this.friend = {
      title: '',
      description: '',
      status: false
    };
  }

}