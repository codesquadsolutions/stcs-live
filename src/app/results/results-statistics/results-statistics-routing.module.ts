import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsStatisticsPage } from './results-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsStatisticsPageRoutingModule {}
