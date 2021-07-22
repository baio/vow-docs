import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppProfileModule } from '@app/profile';
import { IonicModule } from '@ionic/angular';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { Tab3Page } from './tab3.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    AppProfileModule,
  ],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}
