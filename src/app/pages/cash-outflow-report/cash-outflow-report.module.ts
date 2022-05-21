import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashOutflowReportPageRoutingModule } from './cash-outflow-report-routing.module';

import { CashOutflowReportPage } from './cash-outflow-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashOutflowReportPageRoutingModule
  ],
  declarations: [CashOutflowReportPage]
})
export class CashOutflowReportPageModule {}
