import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { FriendDetailsComponent } from './components/friend-details/friend-details.component';
import { FriendListComponent } from './components/friends-list/friends-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFriendComponent,
    FriendDetailsComponent,
    FriendListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
