import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsExamListsPage } from './results-exam-lists.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsExamListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsExamListsPageRoutingModule {}
