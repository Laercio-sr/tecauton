import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintOsPage } from './print-os.page';

const routes: Routes = [
  {
    path: '',
    component: PrintOsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintOsPageRoutingModule {}
