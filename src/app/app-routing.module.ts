import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { tabsRoutes } from './tabs/tabs.module';

const routes: Routes = [
  {
    path: '',
    children: tabsRoutes,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
