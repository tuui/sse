import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveComponent } from './live/live.component';
import { HistoryComponent } from './history/hisrtory.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/history', pathMatch: 'full' },
  { path: 'history', component: HistoryComponent },
  { path: 'live', component: LiveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }