import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  {path: 'profile', component: UserProfileComponent},
  {path: 'list', component: ListUsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
