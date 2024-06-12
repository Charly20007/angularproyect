import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipsComponent } from './memberships/memberships.component';
import { LoginComponent } from './auth/login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'memberships', component: MembershipsComponent },
  { path: 'schedule/:id', component: ScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
