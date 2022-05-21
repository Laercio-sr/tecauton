import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OsListPage } from './os-list.page';

const routes: Routes = [
  {
    path: '',
    component: OsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OsListPageRoutingModule {}
