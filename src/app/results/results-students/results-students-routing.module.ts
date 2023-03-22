import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsStudentsPage } from './results-students.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsStudentsPageRoutingModule {}
