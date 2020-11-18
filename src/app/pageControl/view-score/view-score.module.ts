import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewScorePageRoutingModule } from './view-score-routing.module';

import { ViewScorePage } from './view-score.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewScorePageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [ViewScorePage]
})
export class ViewScorePageModule {}
