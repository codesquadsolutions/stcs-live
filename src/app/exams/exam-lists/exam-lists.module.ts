import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamListsPageRoutingModule } from './exam-lists-routing.module';

import { ExamListsPage } from './exam-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamListsPageRoutingModule
  ],
  declarations: [ExamListsPage]
})
export class ExamListsPageModule {}
