import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendListComponent } from './components/friends-list/friends-list.component';
import { FriendDetailsComponent } from './components/friend-details/friend-details.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';

const routes: Routes = [
  { path: '', redirectTo: 'friends', pathMatch: 'full' },
  { path: 'friends', component: FriendListComponent },
  { path: 'friends/:id', component: FriendDetailsComponent },
  { path: 'add', component: AddFriendComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }