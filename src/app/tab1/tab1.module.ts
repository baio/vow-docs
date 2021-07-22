import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Routes } from '@angular/router';


export const tab1Routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
