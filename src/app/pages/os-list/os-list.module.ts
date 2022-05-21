import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsListPageRoutingModule } from './os-list-routing.module';

import { OsListPage } from './os-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsListPageRoutingModule
  ],
  declarations: [OsListPage]
})
export class OsListPageModule {}
