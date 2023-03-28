import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    pathMatch: "full",
    loadChildren: () => import("./pages/dashboard/dashboard-routing.module").then(
      m => m.DashboardRoutingModule
    )
  },
  {
    path: 'list',
    pathMatch: "full",
    loadChildren: () => import("./pages/list/list-routing.module").then(
      m => m.ListRoutingModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
