import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsExamListsPageRoutingModule } from './results-exam-lists-routing.module';

import { ResultsExamListsPage } from './results-exam-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsExamListsPageRoutingModule
  ],
  declarations: [ResultsExamListsPage]
})
export class ResultsExamListsPageModule {}
