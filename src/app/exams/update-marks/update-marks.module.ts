import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMarksPageRoutingModule } from './update-marks-routing.module';

import { UpdateMarksPage } from './update-marks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMarksPageRoutingModule
  ],
  declarations: [UpdateMarksPage]
})
export class UpdateMarksPageModule {}
