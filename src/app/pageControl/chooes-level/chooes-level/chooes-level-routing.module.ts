import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooesLevelPage } from './chooes-level.page';

const routes: Routes = [
  {
    path: '',
    component: ChooesLevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooesLevelPageRoutingModule {}
