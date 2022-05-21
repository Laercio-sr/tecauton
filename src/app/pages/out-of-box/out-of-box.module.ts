import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutOfBoxPageRoutingModule } from './out-of-box-routing.module';

import { OutOfBoxPage } from './out-of-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutOfBoxPageRoutingModule
  ],
  declarations: [OutOfBoxPage]
})
export class OutOfBoxPageModule {}
