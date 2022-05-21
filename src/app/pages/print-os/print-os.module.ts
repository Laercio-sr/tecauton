import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintOsPageRoutingModule } from './print-os-routing.module';

import { PrintOsPage } from './print-os.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintOsPageRoutingModule
  ],
  declarations: [PrintOsPage]
})
export class PrintOsPageModule {}
