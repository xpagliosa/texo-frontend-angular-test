import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { WinnersByYearModule } from "./cards/winners-by-year/winners-by-year.module";
import { HttpClientModule } from "@angular/common/http";
import { HttpRequestService } from "../services/http-request.service";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    WinnersByYearModule,
    HttpClientModule
  ],
  providers: [HttpRequestService]
})
export class DashboardModule { }
