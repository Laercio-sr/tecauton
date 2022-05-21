import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashOutflowReportPage } from './cash-outflow-report.page';

const routes: Routes = [
  {
    path: '',
    component: CashOutflowReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashOutflowReportPageRoutingModule {}
