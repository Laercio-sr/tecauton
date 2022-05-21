import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsRegisterPageRoutingModule } from './os-register-routing.module';

import { IonicSelectableModule } from 'ionic-selectable';

import { OsRegisterPage } from './os-register.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsRegisterPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [OsRegisterPage]
})
export class OsRegisterPageModule {}
