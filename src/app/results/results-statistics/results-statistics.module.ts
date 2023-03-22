import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsStatisticsPageRoutingModule } from './results-statistics-routing.module';

import { ResultsStatisticsPage } from './results-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsStatisticsPageRoutingModule
  ],
  declarations: [ResultsStatisticsPage]
})
export class ResultsStatisticsPageModule {}
