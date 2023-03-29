import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { WinnersByYearModule } from "./cards/winners-by-year/winners-by-year.module";
import { HttpClientModule } from "@angular/common/http";
import { HttpRequestService } from "../../services/http-request/http-request.service";
import { YearsMultipleWinnersModule } from "./cards/years-multiple-winners/years-multiple-winners.module";
import { TopWinnersStudiosModule } from "./cards/top-winners-studios/top-winners-studios.module";
import { ProducersLongestShortestModule } from "./cards/producers-longest-shortest/producers-longest-shortest.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    WinnersByYearModule,
    HttpClientModule,
    YearsMultipleWinnersModule,
    TopWinnersStudiosModule,
    ProducersLongestShortestModule
  ],
  providers: [HttpRequestService]
})
export class DashboardModule { }
