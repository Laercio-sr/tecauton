import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OsRegisterPage } from './os-register.page';

const routes: Routes = [
  {
    path: '',
    component: OsRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OsRegisterPageRoutingModule {}
