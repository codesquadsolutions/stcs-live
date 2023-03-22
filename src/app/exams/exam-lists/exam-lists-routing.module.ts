import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamListsPage } from './exam-lists.page';

const routes: Routes = [
  {
    path: '',
    component: ExamListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamListsPageRoutingModule {}
