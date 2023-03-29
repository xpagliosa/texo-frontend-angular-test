import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearsMultipleWinnersComponent } from './years-multiple-winners.component';



@NgModule({
    declarations: [
        YearsMultipleWinnersComponent
    ],
    exports: [
        YearsMultipleWinnersComponent
    ],
    imports: [
        CommonModule
    ]
})
export class YearsMultipleWinnersModule { }
