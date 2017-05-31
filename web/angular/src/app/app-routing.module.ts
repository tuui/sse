import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LiveComponent} from './live/live.component';
import {HistoryComponent} from './history/hisrtory.component';

const routes: Routes = [
    {path: 'history', component: HistoryComponent},
    {path: 'live', component: LiveComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}