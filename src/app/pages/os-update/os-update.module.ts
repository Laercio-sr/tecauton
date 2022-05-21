import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsUpdatePageRoutingModule } from './os-update-routing.module';

import { OsUpdatePage } from './os-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsUpdatePageRoutingModule
  ],
  declarations: [OsUpdatePage]
})
export class OsUpdatePageModule {}
