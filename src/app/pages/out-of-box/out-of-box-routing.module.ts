import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutOfBoxPage } from './out-of-box.page';

const routes: Routes = [
  {
    path: '',
    component: OutOfBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutOfBoxPageRoutingModule {}
