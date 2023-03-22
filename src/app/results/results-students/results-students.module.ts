import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsStudentsPageRoutingModule } from './results-students-routing.module';

import { ResultsStudentsPage } from './results-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsStudentsPageRoutingModule
  ],
  declarations: [ResultsStudentsPage]
})
export class ResultsStudentsPageModule {}
