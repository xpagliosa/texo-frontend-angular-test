import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list.component";
import { ListModule } from "./list.module";

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  }
];

@NgModule({
  imports: [
    ListModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ListRoutingModule { }
