import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnersByYearComponent } from './winners-by-year.component';
import { FormsModule } from "@angular/forms";



@NgModule({
    declarations: [
        WinnersByYearComponent
    ],
    exports: [
        WinnersByYearComponent
    ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class WinnersByYearModule { }
