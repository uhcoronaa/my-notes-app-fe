import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedFormsGuard } from 'src/app/guards/unsaved-forms.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [UnsavedFormsGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [UnsavedFormsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
