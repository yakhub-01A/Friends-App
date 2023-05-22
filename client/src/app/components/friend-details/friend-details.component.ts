import { Component, Input, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from 'src/app/models/friend.model';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.css']
})
export class FriendDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentFriend: Friend = {
    title: '',
    description: '',
    status: false
  };
  
  message = '';

  constructor(
    private friendService: FriendService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getFriend(this.route.snapshot.params["id"]);
    }
  }

  getFriend(id: string): void {
    this.friendService.get(id)
      .subscribe({
        next: (data) => {
          this.currentFriend = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateStatus(status: boolean): void {
    const data = {
      title: this.currentFriend.title,
      description: this.currentFriend.description,
      status: status
    };

    this.message = '';

    this.friendService.update(this.currentFriend.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentFriend.status = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateFriend(): void {
    this.message = '';

    this.friendService.update(this.currentFriend.id, this.currentFriend)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This friend was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteFriend(): void {
    this.friendService.delete(this.currentFriend.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/friends']);
        },
        error: (e) => console.error(e)
      });
  }

}