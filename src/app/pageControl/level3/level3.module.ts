import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Level3PageRoutingModule } from './level3-routing.module';

import { Level3Page } from './level3.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Level3PageRoutingModule,
    NgCircleProgressModule
  ],
  declarations: [Level3Page]
})
export class Level3PageModule {}
