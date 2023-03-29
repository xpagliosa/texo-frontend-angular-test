import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducersLongestShortestComponent } from './producers-longest-shortest.component';



@NgModule({
    declarations: [
        ProducersLongestShortestComponent
    ],
    exports: [
        ProducersLongestShortestComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProducersLongestShortestModule { }
