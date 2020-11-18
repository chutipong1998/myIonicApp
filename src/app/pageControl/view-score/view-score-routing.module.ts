import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewScorePage } from './view-score.page';

const routes: Routes = [
  {
    path: '',
    component: ViewScorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewScorePageRoutingModule {}
